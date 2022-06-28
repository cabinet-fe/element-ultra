import type { InjectionKey, Ref } from 'vue'
import type { DataTableColumn, DataTableProps } from './data-table'
import type { TreeNode } from './utils'

export const dataTableToken: InjectionKey<{
  headerRows: Ref<TreeNode[][]>
  leafColumns: Ref<DataTableColumn[]>
  rootProps: DataTableProps
}> = Symbol()
