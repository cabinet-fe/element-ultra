import { omit } from 'lodash'
import { shallowReactive } from 'vue'
import type { FormModel, FormRules } from './form'

/**
 * 使用表单数据模型
 * @param model 表单数据模型
 */
export default function useFormModel<M extends FormModel>(model: M) {
  let modelKeys = Object.keys(model)

  const form = shallowReactive(
    modelKeys.reduce((acc, key) => {
      acc[key] = model[key].value
      return acc
    }, {}) as { [key in keyof M]: M[key]['value'] }
  )

  const rules = modelKeys.reduce((acc, key) => {
    acc[key] = omit(model[key], ['value'])
    return acc
  }, {}) as { [K in keyof M]: FormRules }
  return [form, rules] as const
}
