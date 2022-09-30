import { shallowReactive, ShallowRef, watch } from "vue"
import type { TableSelectProps } from "./table-select"

export default function useCheck(props: TableSelectProps, internalData: ShallowRef<any[]>) {
  const state = shallowReactive({
    allChecked: true,
    indeterminate: false
  })

  const checkedKeys = shallowReactive(new Set<string | number>())

  watch(() => props.data || internalData.value, (data) => {
    const { valueKey } = props
    data.some(item => {

      if (checkedKeys.has(item[valueKey])) {
        state.indeterminate = true
      } else {
        state.allChecked = false
      }
      // 当检测到未全选和部分选择时直接返回不继续
      return !state.allChecked && state.indeterminate
    })
  })

  return {
    checkedKeys,
    state
  }
}