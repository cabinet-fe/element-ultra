import { omit } from 'lodash'
import { shallowReactive } from 'vue'
import type { FormModel, FormModelItem } from './form'

/**
 * 使用表单数据模型
 * @param model 表单数据模型
 */
export default function useFormModel(model: FormModel) {
  let modelKeys = Object.keys(model)
  const form = shallowReactive(modelKeys.reduce((acc, key) => {
    acc[key] = model[key].value
    return acc
  }, {} as { [K: keyof FormModel]: any }))
  const rules =  modelKeys.reduce((acc, key) => {
    acc[key] = omit(model[key], ['value'])
    return acc
  }, {} as { [K: keyof FormModel]: FormModelItem })
  return [form, rules] as const
}
