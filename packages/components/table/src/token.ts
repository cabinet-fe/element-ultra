import type { UseNamespaceReturn } from '@element-ultra/element-ultra'
import type { ShallowRef } from 'vue'
import type { CSSProperties } from 'vue'
import type { InjectionKey } from 'vue'
import type { TableProps, TableColumn } from './table'

type FinalColumn = TableColumn & {
  render: TableColumn['render'] & {}
  name: () => any
}

export const tableToken: InjectionKey<{
  /** 表格根组件属性 */
  rootProps: TableProps
  /** 类命名空间 */
  ns: UseNamespaceReturn
  /** 布局后的表格列 */
  columnLayouts: ShallowRef<{
    left: FinalColumn[]
    center: FinalColumn[]
    right: FinalColumn[]
  }>
  /** 碾平的表格列 */
  columns: ShallowRef<FinalColumn[]>
  /** 获取单元格样式 */
  getCellStyle: (column: TableColumn) => CSSProperties
}> = Symbol('tableToken')
