import { keyBy, omit } from 'lodash'
import { shallowReactive, customRef, computed } from 'vue'
import type { FormModel, FormModelItem } from './form'

/**
 * 使用表单数据模型
 * @param model 表单数据模型
 */
export default function useFormModel<M extends FormModel>(model: M) {
  let modelKeys = Object.keys(model)

  type Model<K extends keyof M = keyof M> = {
    [key in K]: M[key]['value'] extends (...args: any[]) => infer P ? P : M[key]['value']
  }

  let keyEffects = new Map<keyof M, Set<() => any>>()

  const rawModel =  modelKeys.reduce((acc, key) => {
    let v = model[key].value
    acc[key as keyof Model] = typeof v === 'function' ? undefined : v
    return acc
  }, {} as Model)

  let activeEffect: null | (() => any)


  const track = (p: string) => {
    if (!activeEffect) return

    let eSet = keyEffects.get(p)
    if (eSet) {
      eSet.add(activeEffect)
    } else {
      keyEffects.set(p, new Set([activeEffect]))
    }
  }
  let proxy = new Proxy(
    rawModel,
    {
      get(t, p: string) {
        track(p)
        let v = t[p]
        return v
      },
      set(t, p, v) {
        t[p] = v
        keyEffects.get(p)?.forEach(effect => {
          // effect()
          console.log(effect)
        })
        return true
      }
    }
  )

  const form = shallowReactive(proxy)

  // 触发追踪
  modelKeys.forEach(key => {
    let v = model[key].value
    if (typeof v === 'function') {

      activeEffect = () => {
        form[key] = v(form)
      }
      activeEffect()
      activeEffect = null
    }
  })



  const rules = modelKeys.reduce((acc, key) => {
    acc[key as keyof Model] = omit(model[key], ['value'])
    return acc
  }, {} as { [K in keyof M]: Omit<FormModelItem, 'value'> })

  return [form, rules] as const
}


// const [model] = useFormModel({
//   a: {
//     value: (): number => 1
//   },
//   b: {
//     value: ''
//   }
// })
