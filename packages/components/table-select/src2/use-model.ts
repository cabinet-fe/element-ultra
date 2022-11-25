import {
  computed,
  shallowReactive,
  shallowRef,
  Ref,
  ComputedRef,
  watch
} from 'vue'
import type { TableSelectProps } from './table-select'

interface Options {
  props: TableSelectProps
  data: ComputedRef<any[]>
  visible: Ref<boolean>
}

export default function useModel(options: Options) {
  const { props, data, visible } = options

  /** 单选数据 */
  const selected = shallowRef<Record<string, any> | null>(null)

  /** 选中的数据, 使用对象来存储 */
  const checkedData = shallowRef(shallowReactive<Record<string, any>>({}))

  /** 选择的数据的数量 */
  const checkedSize = computed(() => {
    return Object.keys(checkedData.value).length
  })

  const setSelectOrChecked = (
    value: Record<string, any> | any[] | undefined
  ) => {
    if (!value) return

    const { valueKey } = props

    if (props.multiple) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          checkedData.value[item[valueKey]] = item
        })
      } else {
        console.error('table-select在多选的情况下, modelValue应传入一个数组')
      }
      return
    }

    handleSelect(value)
  }

  watch(
    () => props.modelValue,
    value => {
      setSelectOrChecked(value)
    },
    { immediate: true }
  )

  watch(visible, v => {
    if (v || !props.multiple) return

    checkedData.value = shallowReactive({})
    setSelectOrChecked(props.modelValue)
  })

  const indeterminate = computed(() => {
    const { valueKey } = props

    return (
      data.value.some(item => !!checkedData.value[item[valueKey]]) &&
      !allChecked.value
    )
  })

  // 因为要跨分页, 所以需要通过以下的逻辑去判断
  const allChecked = computed(() => {
    const { valueKey } = props
    return data.value.every(item => !!checkedData.value[item[valueKey]])
  })

  /** 复选框操作 */
  const handleToggleCheck = (check: boolean, row: any) => {
    const { valueKey } = props
    const primaryKey = row[valueKey]
    if (!primaryKey) return
    if (check) {
      checkedData.value[primaryKey] = row
    } else {
      delete checkedData.value[primaryKey]
    }
  }

  const toggleAllChecked = (checked: boolean) => {
    const { valueKey } = props
    if (checked) {
      data.value.forEach(item => (checkedData.value[item[valueKey]] = item))
    } else {
      data.value.forEach(item => {
        delete checkedData.value[item[valueKey]]
      })
    }
  }

  /** 单选框操作 */
  const handleSelect = (row: any) => {
    selected.value = row
  }

  return {
    checkedData,
    allChecked,
    selected,
    checkedSize,
    indeterminate,
    handleToggleCheck,
    toggleAllChecked,
    handleSelect
  }
}
