import { computed, shallowReactive } from 'vue'
import type {
  MultipleFormProps,
  MultipleFormRules
} from './type'

interface Options {
  props: MultipleFormProps
}

export default function useInlineEdit(options: Options) {
  const { props } = options

  /** 列的校验规则 */
  const columnRules = computed(() => {
    return (props.columns ?? []).reduce((acc, column) => {
      if (column.rules) {
        acc[column.key] = column.rules
      }
      return acc
    }, {} as Record<string, Partial<MultipleFormRules>>)
  })

  /** 错误提示 */
  const errorTips = shallowReactive<Record<string, any>>({})

  /** 校验器 */
  const validators = {
    required(value: any, required: boolean, msg = '该项必填') {
      if (!required) return

      if (Array.isArray(value)) {
        return value.length > 0 ? undefined : msg
      }
      if (!value && value !== 0) {
        return msg
      }
    },

    length(value: any, len: number, msg = '') {
      if (value.length !== len) {
        return msg || `长度应该等于${len}`
      }
    },

    min(value: any, min: number, msg = '') {
      if (Array.isArray(value)) {
        return value.length < min ? msg || `该项最小长度应为 ${min}` : undefined
      }

      if (typeof value !== 'number') {
        return msg || '请输入数字 '
      }

      if (typeof value === 'number' && value < min) {
        return msg || `最小值不得小于：${min}`
      }
    },

    max(value: any, max: number, msg = '') {
      if (Array.isArray(value)) {
        return value.length > max ? msg || `该项最大长度应为 ${max}` : undefined
      }

      if (typeof value !== 'number') {
        return msg || '请输入数字'
      }

      if (typeof value === 'number' && value > max) {
        return msg || `最大值不得大于：${max}`
      }
    },

    match(value: any, pattern: RegExp, msg = '') {
      if (typeof value !== 'string') {
        return msg || `请输入类型为：[string],而不是${typeof value}类型`
      }

      if (!pattern.test(value)) {
        return msg || `不匹配正则表达式：${pattern}`
      }
    }
  }

  /**
   * 单规则校验(一个字段可能会有多个校验规则)
   * @param type 校验的规则类型
   * @param value 校验的值
   * @param ruleValue 校验的规则
   */
  const singleRuleValidate = <
    T extends keyof Omit<MultipleFormRules, 'validator'>
  >(
    type: T,
    value: any,
    ruleValue: any
  ) => {
    let rulesIsArray = Array.isArray(ruleValue)
    const validator = validators[type]
    return validator(
      value,
      // @ts-ignore
      rulesIsArray ? ruleValue[0] : ruleValue,
      rulesIsArray ? ruleValue[1] : undefined
    )
  }

  /**
   * 校验单个字段
   * @param fieldValue 字段值
   * @param fieldRules 字段的校验规则
   * @param data 单挑数据
   */
  const validateField = async (
    fieldValue: any,
    fieldRules: Partial<MultipleFormRules>,
    data: any
  ) => {
    const { validator, required, ...otherRules } = fieldRules

    const errorMsg = singleRuleValidate('required', fieldValue, required)
    if (errorMsg) return errorMsg

    if (!fieldValue && fieldValue !== 0) return

    // validator独立校验
    if (validator) {
      const errorMsg = await validator(fieldValue, data, props.data ?? [])
      if (errorMsg) return errorMsg
    }

    for (const key in otherRules) {
      type Key = keyof typeof otherRules
      const errorMsg = singleRuleValidate(
        key as Key,
        fieldValue,
        otherRules[key as Key]
      )
      if (errorMsg) return errorMsg
    }
  }

  /**
   * 校验数据
   * @param data 数据项
   */
  async function validate(data: Record<string, any>[] | Record<string, any>) {
    // 校验前先清空之前的校验信息
    clearValidate()

    const rules = columnRules.value

    // 校验多条数据时以字段循环为优先
    if (Array.isArray(data)) {
      const { childrenKey } = props
      const recursiveValidate = async (
        field: string,
        data: Record<string, any>[]
      ) => {
        let i = -1

        while (++i < data.length && !errorTips[field]) {
          let item = data[i]
          let errorMsg = await validateField(item[field], rules[field], item)
          if (errorMsg) {
            errorTips[field] = errorMsg
          }

          if (item[childrenKey]) {
            await recursiveValidate(field, item[childrenKey])
          }
        }
      }

      for (const field in rules) {
        await recursiveValidate(field, data)
      }
    }

    // 校验单条数据
    else {
      for (const field in rules) {
        const errorMsg = await validateField(data[field], rules[field], data)
        if (errorMsg) {
          errorTips[field] = errorMsg
        }
      }
    }

    for (let _ in errorTips) {
      return false
    }

    return true
  }

  /**
   * 清除校验
   */
  const clearValidate = () => {
    for (const key in errorTips) {
      delete errorTips[key]
    }
  }

  return {
    errorTips,
    columnRules,
    clearValidate,
    validate
  }
}
