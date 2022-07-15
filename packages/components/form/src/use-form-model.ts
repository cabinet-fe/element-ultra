import { omit } from 'lodash'
import { shallowReactive, watch } from 'vue'
import type { FormModel, FormModelItem } from './form'

type GetModel<T extends Record<string, any>> = {
  [key in keyof T]: T[key]['value']
}

const keyEffects = new Map<string, Set<() => void>>()

const getEffects = (key: string) => {
  let effects = keyEffects.get(key)
  if (!effects) {
    effects = new Set()
    keyEffects.set(key, effects)
  }
  return effects
}

let activeEffect: (() => void) | null

const track = (key: string) => {
  if (activeEffect) {
    let effects = getEffects(key)
    effects.add(activeEffect)
  }
}

const trigger = (key: string) => {
  let effects = getEffects(key)
  effects.forEach(effect => effect())
}

const watchGetter = (
  getters: Record<string, (...args: any[]) => any>,
  model: Record<string, any>
) => {
  Object.keys(getters).forEach(key => {
    let getter = getters[key]

    activeEffect = () => {
      model[key] = getter(model)
    }

    // 触发
    getter(model)

    activeEffect = null
  })
}

const proxy = (o: { [key: string]: any }) => {
  return new Proxy(o, {
    get(t, p: string) {
      track(p)
      return t[p]
    }
  })
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
    [key in K]: (model: Model) => any
  }
) {
  let modelKeys = Object.keys(model) as K[]

  const rawModel = modelKeys.reduce((acc, key) => {
    let v = model[key].value
    acc[key as K] = typeof v === 'function' ? undefined : v
    return acc
  }, {} as Model)

  let p = proxy(rawModel)

  const form = shallowReactive(rawModel)

  watch(form, (newVal, oldVal) => {
    for (const key in newVal) {
      if (newVal[key] !== oldVal[key]) {
        trigger(key)
      }
    }
  })

  if (valueGetter) {
    watchGetter(valueGetter, p)
  }

  const rules = modelKeys.reduce((acc, key) => {
    acc[key] = omit(model[key], ['value'])
    return acc
  }, {} as { [key in K]: Omit<FormModelItem, 'value'> })

  return [form, rules] as const
}
