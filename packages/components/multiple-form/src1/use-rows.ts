import { shallowRef, watch } from "vue"
import type { MultipleFormProps, MultipleFormRow } from "./multiple-form"
import { wrapDataRows } from './utils'

interface Options {
  props: MultipleFormProps
}

export default function useRows(options: Options) {
  const { props } = options

  const rows = shallowRef<MultipleFormRow[]>([])

  // 不能每次data更新时都重新包裹row, 要缓存用户更改的内容
  watch(() => props.data, data => {
    if (!data) return

    rows.value = wrapDataRows(data)
  })
}