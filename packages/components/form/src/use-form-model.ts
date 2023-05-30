import { omit } from 'lodash'
import { isReactive, shallowReactive } from 'vue'
import type { FormModel, FormModelItem } from './form'
import { isObject } from '@element-ultra/utils'

type GetModel<T extends Record<string, any>> = {
  [key in keyof T]: T[key] extends { [k: string]: any; children: any }
    ? GetModel<T[key]['children']>
    : T[key]['value']
}

function proxyHelper() {
  // 副作用收集
  const keyEffects = new Map<string, Set<() => void>>()
  // 依赖收集
  const keyDeps = new Map<string, Set<string>>()

  const getEffects = (key: string) => {
    let effects = keyEffects.get(key)
    // 不能有相互依赖
    if (!effects) {
      effects = new Set()
      keyEffects.set(key, effects)
    }
    return effects
  }

  // 当前激活的副作用
  let activeEffect: (() => void) | null
  // 当前激活的key
  let activeKey: string | null

  /**
   * 依赖追踪
   */
  const track = (key: string) => {
    if (activeKey) {
      let trackKeyDeps = keyDeps.get(key)

      if (trackKeyDeps?.has(activeKey)) {
        return console.error(
          `无法被追踪, 存在循环依赖: [${key}]  <=> [${activeKey}]`
        )
      }

      let deps = keyDeps.get(activeKey)
      deps?.add(key)
    }

    if (activeEffect) {
      let effects = getEffects(key)
      effects.add(activeEffect)
    }
  }

  const trigger = (key: string) => {
    if (keyEffects.get(key)) {
      let effects = getEffects(key)
      effects.forEach(effect => effect())
    }
  }

  const watchGetter = (
    getters: Record<string, undefined | ((...args: any[]) => any)>,
    model: Record<string, any>
  ) => {
    Object.keys(getters).forEach(key => {
      let getter = getters[key]
      if (!getter) return

      keyDeps.set(key, new Set())
      activeKey = key

      activeEffect = () => {
        model[key] = getter!(model)
      }

      // 触发副作用收集
      let v = getter(model)

      activeKey = null
      activeEffect = null

      // 因为赋值会立马执行副作用, 并触发新的getter
      // 因此, 清空全局变量之后再赋值, 避免无限触发getter(循环引用时)
      model[key] = v
    })
  }

  const proxy = <T extends { [key: string]: any }>(o: T): T => {
    return new Proxy<T>(o, {
      get(t, p: string) {
        track(p)
        return t[p]
      },
      set(t: { [key: string]: any }, p: string, val) {
        t[p] = val
        trigger(p)
        return true
      }
    })
  }

  return {
    proxy,
    watchGetter
  }
}

/**
 * 使用表单数据模型
 * @param model 表单数据模型
 */
export default function useFormModel<
  M extends FormModel,
  K extends keyof M,
  Model extends GetModel<M> = GetModel<M>
>(
  model: M,
  valueGetter?: {
    [key in K]?: (model: Model) => any
  }
) {
  const rawModel = {} as Model

  const reduceRawModel = (model: FormModel, rawModel: Record<string, any>) => {
    const modelKeys = Object.keys(model)
    modelKeys.forEach(key => {
      const modelItem = model[key]
      rawModel[key] = modelItem.value
      if (modelItem.children) {
        let value = rawModel[key]
        if (!value || !isObject(value)) {
          throw new Error(`请为${key}字段指定一个对象值`)
        }
        // 非响应的对象要使其响应
        if (!isReactive(value)) {
          rawModel[key] = shallowReactive(value)
        }
        reduceRawModel(modelItem.children, rawModel[key])
      }
    })
  }

  reduceRawModel(model, rawModel)

  const rules: Record<string, Omit<FormModelItem, 'value'>> = {}

  // 递归合并子级规则, 以便校验.
  // test: { children: { test1: { required: true } } } -> 'test.test1': { required: true }
  const getRules = (model: FormModel, pre = '') => {
    const modelKeys = Object.keys(model)
    modelKeys.forEach(key => {
      const modelItem = model[key]
      if (modelItem.children) {
        getRules(modelItem.children, pre + key + '.')
      } else {
        rules[pre + key] = omit(modelItem, ['value'])
      }
    })
  }
  getRules(model)

  const form = shallowReactive(rawModel)

  // 设置一个代理层
  if (valueGetter) {
    const { proxy, watchGetter } = proxyHelper()
    let proxyForm = proxy<Model>(form)
    // 访问proxyForm的属性来触发依赖收集
    watchGetter(valueGetter, proxyForm)

    return [proxyForm, rules] as const
  }

  return [form, rules] as const
}