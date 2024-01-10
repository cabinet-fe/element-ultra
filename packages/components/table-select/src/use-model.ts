import {
  computed,
  shallowReactive,
  shallowRef,
  Ref,
  ComputedRef,
  watch
} from 'vue'
import type { TableSelectProps } from './table-select'
import { getChainValue } from '@element-ultra/utils'

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

  const setCheckedData = (item: Record<string, any>) => {
    checkedData.value[getChainValue(item, props.valueKey)] = item
  }

  const removeCheckedData = (item: Record<string, any>) => {
    delete checkedData.value[getChainValue(item, props.valueKey)]
  }
  const getCheckedData = (item: Record<string, any>) => {
    return checkedData.value[getChainValue(item, props.valueKey)]
  }

  /** 选择的数据的数量 */
  const checkedSize = computed(() => {
    return Object.keys(checkedData.value).length
  })

  /** 单选框操作 */
  const setSelectedData = (row: any) => {
    selected.value = row
  }

  const setSelectOrChecked = (
    value: Record<string, any> | any[] | undefined
  ) => {
    if (!value) return

    if (props.multiple) {
      if (Array.isArray(value)) {
        value.forEach(setCheckedData)
      } else {
        console.error('table-select在多选的情况下, modelValue应传入一个数组')
      }
      return
    }
    setSelectedData(value)
  }

  const handleClear = () => {
    if (props.multiple) {
      checkedData.value = shallowReactive({})
    } else {
      selected.value = null
    }
  }

  // 监听值变化
  watch(
    () => props.modelValue,
    value => {
      handleClear()
      setSelectOrChecked(value)
    },
    { immediate: true }
  )

  watch(visible, v => {
    if (v || !props.multiple) return
    handleClear()
    setSelectOrChecked(props.modelValue)
  })

  const indeterminate = computed(() => {
    return data.value.some(item => !!getCheckedData(item)) && !allChecked.value
  })

  // 因为要跨分页, 所以需要通过以下的逻辑去判断
  const allChecked = computed(() => {
    const { rowDisabled } = props
    return data.value.every((item, index) => {
      return !!getCheckedData(item) || rowDisabled?.(item, index)
    })
  })

  /** 复选框操作 */
  const handleToggleCheck = (row: any, rowIndex: number) => {
    const isChecked = !!getCheckedData(row)
    if (isChecked) {
      removeCheckedData(row)
    } else {
      !props.rowDisabled?.(row, rowIndex) && setCheckedData(row)
    }
  }

  const toggleAllChecked = (checked: boolean) => {
    if (checked) {
      const  { rowDisabled } = props
      data.value.forEach((item, index) => {
        !rowDisabled?.(item, index) && setCheckedData(item)
      })
    } else {
      data.value.forEach(removeCheckedData)
    }
  }

  return {
    checkedData,
    allChecked,
    selected,
    checkedSize,
    indeterminate,
    handleToggleCheck,
    toggleAllChecked,
    setSelectedData,
    handleClear
  }
}
