import type { UseNamespaceReturn } from '@element-ultra/element-ultra'
import type { ShallowRef } from 'vue'
import type { ComputedRef } from 'vue'
import type { CSSProperties } from 'vue'
import type { InjectionKey } from 'vue'
import type { TableProps, TableColumn, FinalTableColumn, TableEmits } from './table'

export const tableToken: InjectionKey<{
  /** 表格根组件属性 */
  rootProps: TableProps
  /** 表格根组件事件 */
  rootEmit: TableEmits
  /** 类命名空间 */
  ns: UseNamespaceReturn
  /** 布局后的表格列 */
  columnLayouts: ShallowRef<
    Record<'left' | 'center' | 'right', FinalTableColumn[]>
  >
  /** 碾平的表格列 */
  columns: ShallowRef<FinalTableColumn[]>
  /** 合计方法 */
  summaryMethods: ComputedRef<Record<string, (ctx: {
    key: string;
    data: any[];
    total: number;
}) => any> | undefined>
  /** 获取单元格样式 */
  getCellStyle: (column: TableColumn, type?: 'left' | 'center' | 'right') => CSSProperties

  containerWidth: ShallowRef<number>
}> = Symbol('tableToken')
