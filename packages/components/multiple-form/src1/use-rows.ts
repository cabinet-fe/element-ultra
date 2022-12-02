import { shallowRef, watch } from "vue"
import type { MultipleFormProps, MultipleFormRow } from "./multiple-form"
import { wrapDataRows } from './utils'

interface Options {
  props: MultipleFormProps
}

export default function useRows(options: Options) {
  const { props } = options

  const rows = shallowRef<MultipleFormRow[]>([])

  const editedRowsMap = new Map()

  // 不能每次data更新时都重新包裹row
  // 一旦editedRowsMap不为空则返回
  watch(() => props.data, data => {
    if (!data || editedRowsMap.size) return

    rows.value = wrapDataRows(data)
  })

  return {
    rows,
    editedRowsMap
  }
}