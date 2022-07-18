import { omit } from 'lodash'
import { shallowReactive } from 'vue'
import type { FormModel, FormModelItem } from './form'

type GetModel<T extends Record<string, any>> = {
  [key in keyof T]: T[key]['value']
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
  let modelKeys = Object.keys(model) as K[]

  const rawModel = modelKeys.reduce((acc, key) => {
    acc[key] = model[key].value
    return acc
  }, {} as Model)

  const rules = modelKeys.reduce((acc, key) => {
    acc[key] = omit(model[key], ['value'])
    return acc
  }, {} as { [key in K]: Omit<FormModelItem, 'value'> })

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
