import type { InjectionKey, Ref } from 'vue'
import type { DataTableColumn, DataTableProps } from './data-table'

export const dataTableToken: InjectionKey<{
  headers: Ref<DataTableColumn[][]>
  leafColumns: Ref<DataTableColumn[]>
  rootProps: DataTableProps
}> = Symbol()
