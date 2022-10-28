import { computed, shallowReactive, shallowRef, type ShallowRef } from 'vue'
import type {
  MultipleFormEmits,
  MultipleFormProps,
  MultipleFormRules
} from './multiple-form'
import type MultipleFormRow from './multiple-form-row.vue'

interface Options {
  props: MultipleFormProps
  emit: MultipleFormEmits
  targetIndex: ShallowRef<number>
  rows: ShallowRef<any[]>
  emitData: () => void
}

export default function useInline(options: Options) {
  const { props, emit, rows, targetIndex, emitData } = options

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
  const errorTip = shallowReactive<Record<string, any>>({})

  /** 显示引导 */
  const showGuide = shallowRef(false)

  /** 行引用 */
  const rowRefs = shallowRef<InstanceType<typeof MultipleFormRow>[]>([])

  /** 创建一个空行 */
  const createInlineRow = () => {
    let row = shallowReactive(
      (props.columns ?? []).reduce(
        (acc, cur) => {
          if (cur.defaultValue instanceof Function) {
            let v = cur.defaultValue()
            if (v instanceof Promise) {
              v.then(result => (row[cur.key] = result))
            } else {
              acc[cur.key] = v
            }
          } else {
            acc[cur.key] = cur.defaultValue
          }
          return acc
        },
        { __new__: true } as Record<string, any>
      )
    )

    return row
  }

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

  /** 验证 */
  async function validate(
    item: any,
    fieldsRules: Record<string, Partial<MultipleFormRules>>
  ) {
    let isValid = true

    // 用所有的校验规则进行校验
    for (const fieldKey in fieldsRules) {
      const rule = fieldsRules[fieldKey]
      let itemValue = item[fieldKey]

      const { validator, required, ...restRule } = rule

      // 首先校验必填项
      let errorMsg = singleRuleValidate('required', itemValue, required)
      errorTip[fieldKey] = errorMsg
      if (errorMsg) {
        isValid = false
        continue
      }

      // 值为空时不再对require规则之外的进行校验
      if (!itemValue && itemValue !== 0) continue

      // validator独立校验
      if (validator) {
        let errorMsg = await validator(itemValue, item, rows.value)
        errorTip[fieldKey] = errorMsg
        if (errorMsg) {
          isValid = false
          continue
        }
      }

      for (const key in restRule) {
        type Key = keyof typeof restRule
        const errorMsg = singleRuleValidate(
          key as Key,
          itemValue,
          restRule[key as Key]
        )

        errorTip[fieldKey] = errorMsg
        if (errorMsg) {
          isValid = false
          break
        }
      }
    }
    return isValid
  }

  const clearValidate = () => {
    for (const key in errorTip) {
      errorTip[key] = undefined
    }
  }

  const resetTargetIndex = () => {
    targetIndex.value = -1
  }

  /** 删除rows或插入row */
  const splitRowByIndex = (index: number, row?: any) => {
    if (row) {
      rows.value = [
        ...rows.value.slice(0, index),
        row,
        ...rows.value.slice(index)
      ]
    } else {
      rows.value = [
        ...rows.value.slice(0, index),
        ...rows.value.slice(index + 1)
      ]
    }
  }

  /** 保存行 */
  const handleSaveRow = async (item: any, i: number) => {
    let valid = await validate(item, columnRules.value)
    if (!valid) return
    delete item['__new__']
    resetTargetIndex()
    emit('save', item, rows.value)
    emitData()
  }

  /** 删除 */
  const handleDeleteRow = (item: any, index: number) => {
    splitRowByIndex(index)
    if (index === targetIndex.value) {
      resetTargetIndex()
    }
    // 删除的行索引小于处于编辑状态的行索引，则目标索引减一
    else if (index < targetIndex.value) {
      targetIndex.value--
    }
    emit('delete', item)
    emitData()
  }

  /** 进入编辑状态 */
  const handleEnterEdit = (index: number) => {
    let preEditItem = rows.value[targetIndex.value]
    // 删除未保存的编辑行
    if (preEditItem?.__new__) {
      splitRowByIndex(targetIndex.value)
    }
    targetIndex.value = index
  }

  /**
   * 退出编辑
   * 1. 更新状态下退出正常退出
   * 2. 新增状态下退出删除
   */
  const handleExitEdit = (item: any, index: number) => {
    if (item.__new__) {
      splitRowByIndex(index)
      clearValidate()
    }
    resetTargetIndex()
  }

  const handleMouseEnter = (index: number) => {
    if (targetIndex.value === index) {
      showGuide.value = false
    }
  }

  return {
    errorTip,
    showGuide,
    columnRules,
    rowRefs,
    createInlineRow,
    handleSaveRow,
    splitRowByIndex,
    /** 删除 */
    handleDeleteRow,
    clearValidate,
    handleEnterEdit,
    handleExitEdit,
    handleMouseEnter
  }
}
