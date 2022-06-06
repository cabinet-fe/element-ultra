import { computed, shallowReactive, shallowRef, type ShallowRef } from 'vue'
import type { MultipleFormEmits, MultipleFormProps, MultipleFormRules } from './multiple-form'

interface Options {
  props: MultipleFormProps
  emit: MultipleFormEmits
  targetIndex: ShallowRef<number>
  rows: ShallowRef<any[]>
}

export default function useInline(options: Options) {
  const { props, emit, rows, targetIndex } = options

  /** 列的校验规则 */
  const columnRules = computed(() => {
    return props.columns.reduce((acc, column) => {
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
  const rowRefs = shallowRef<any[]>([])

  /** 创建一个空行 */
  const createInlineRow = () => {

    let row = shallowReactive(
      props.columns.reduce(
        (acc, cur) => {
          if (cur.defaultValue instanceof Function) {
            let v = cur.defaultValue()
            if (v instanceof Promise) {
              v.then(result => row[cur.key] = result)
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

    max(value: any, max: number, msg = ''): any {
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

  /** 验证 */
  function validate(item: any, rules: Record<string, Partial<MultipleFormRules>>) {
    let isValid = true
    Object.keys(rules).forEach(async fieldKey => {
      const rule = rules[fieldKey]

      const { validator, ...restRule } = rule
      // validator独立校验
      if (validator) {
        let errorMsg = await validator(item[fieldKey], item, rows.value)
        errorTip[fieldKey] = errorMsg
        if (errorMsg) {
          isValid = false
          return
        }
      }
      for (const key in restRule) {
        let rulesIsArray = Array.isArray(restRule[key])

        const errorMsg = validators[key](
          item[fieldKey],
          rulesIsArray ? restRule[key][0] : restRule[key],
          rulesIsArray ? restRule[key][1] : undefined
        )

        errorTip[fieldKey] = errorMsg
        if (errorMsg) {
          isValid = false
          break
        }
      }
    })

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
      rows.value = [...rows.value.slice(0, index), row, ...rows.value.slice(index)]
    } else {
      rows.value = [...rows.value.slice(0, index), ...rows.value.slice(index + 1)]
    }
  }

  /** 保存行 */
  const handleSaveRow = (item: any, i: number) => {
    let valid = validate(item, columnRules.value)
    if (!valid) return
    delete item['__new__']
    resetTargetIndex()
    emit('save', item, rows.value)
    emit('change', rows.value)
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
    emit('change', rows.value)
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
