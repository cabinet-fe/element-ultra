import type { InjectionKey } from 'vue'
import type { DataTableEmits, DataTableProps } from './data-table'
import type useColumns from './hooks/use-columns'
import type useStyle from './hooks/use-style'
import type useState from './hooks/use-state'
import type { useNamespace } from '@element-ultra/hooks'

export const dataTableToken: InjectionKey<
  {
    rootProps: DataTableProps
    emit: DataTableEmits,
    state: ReturnType<typeof useState>
    ns: ReturnType<typeof useNamespace>
  } & ReturnType<typeof useColumns> &
    ReturnType<typeof useStyle>
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
