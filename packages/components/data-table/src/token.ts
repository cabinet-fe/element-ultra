import type { InjectionKey } from 'vue'
import type { DataTableEmits, DataTableProps } from './data-table'
import type useColumns from './hooks/use-columns'
import type useStyle from './hooks/use-style'
import type useState from './hooks/use-state'
import type { useNamespace } from '@element-ultra/hooks'
import type { TableHeader } from './utils'

export const dataTableToken: InjectionKey<
  {
    rootProps: DataTableProps
    emit: DataTableEmits
    ns: ReturnType<typeof useNamespace>
  } & ReturnType<typeof useColumns> &
    ReturnType<typeof useStyle> &
    ReturnType<typeof useState>
> = Symbol()

export const dataBodyToken: InjectionKey<{
  /** 单元格类 */
  cellClass: string
  /** 左侧固定的单元格的类 */
  leftCellClass: string
  /** 中间列的类 */
  centerCellClass: string
  /** 右侧固定单元格的类 */
  rightCellClass: string
}> = Symbol()

export const dataFooterToken: InjectionKey<{
  /** 单元格类 */
  cellClass: string
  /** 左侧固定的单元格的类 */
  leftCellClass: string
  /** 中间列的类 */
  centerCellClass: string
  /** 右侧固定单元格的类 */
  rightCellClass: string
}> = Symbol()

export const dataHeaderToken: InjectionKey<{
  /** 单元格类 */
  cellClass: string
  /** 左侧固定的单元格的类 */
  leftCellClass: string
  /** 拖拽元素类 */
  resizeClass: string
  /** 中间列的类 */
  centerCellClass: string
  /** 右侧固定单元格的类 */
  rightCellClass: string
  /** 表头行长度 */
  getCellRowSpan: (header: TableHeader, rowIndex: number) => number | undefined
  /** 鼠标按下处理事件 */
  handleResizeMousedown: (event: MouseEvent, header: TableHeader) => void
}> = Symbol()
