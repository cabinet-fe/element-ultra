import { omit } from 'lodash'
import { shallowReactive } from 'vue'
import type { FormModel, FormModelItem } from './form'

/**
 * 使用表单数据模型
 * @param model 表单数据模型
 */
export default function useFormModel<M extends FormModel>(model: M) {
  let modelKeys = Object.keys(model)

  type Model = { [key in keyof M]: M[key]['value'] }

  const form = shallowReactive(
    modelKeys.reduce((acc, key) => {
      acc[key] = model[key].value
      return acc
    }, {}) as Model
  )

  const rules = modelKeys.reduce((acc, key) => {
    acc[key] = omit(model[key], ['value'])
    return acc
  }, {}) as { [K in keyof M]: Omit<FormModelItem, 'value'> }

  return [form, rules] as const
}
