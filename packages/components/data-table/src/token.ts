import type { InjectionKey, ToRefs } from "vue"
import type { DataTableColumn, DataTableProps } from "./data-table"

export const dataTableToken: InjectionKey<ToRefs<{
  headers: DataTableColumn[][];
  leafColumns: DataTableColumn[]
} & DataTableProps>> = Symbol()