
import type { ExtractPropTypes, PropType } from 'vue'

/** 数据表格列 */
export interface DataTableColumn {
  /** 列的默认宽度 */
  width?: number;
  /** 列的最小宽度 */
  minWidth?: number;
  /** 列的名称, 在表头中显示 */
  name: string | (() => any)
  /** 从值中取的字段, 支持链式 */
  key: string
  /** 是否支持排序 */
  sort?: boolean
  /** 自定义渲染 */
  render?: (row: any, index: number, val: any) => any
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 是否固定 */
  fixed?: 'left' | 'right'
  /** 子列 */
  children?: DataTableColumn[]
}

export const dataTableProps = {
  columns: {
    type: Array as PropType<DataTableColumn[]>,
    required: true,
  },

  /** 数据可以自行传入 */
  data: {
    type: Array as PropType<any[]>,
  },

  /** 是否渲染分页 */
  pagination: Boolean,

  /** 显示表尾合计行 */
  showSummary: Boolean,

  /** 指定合计的列, 指定showSummary时该字段必填  */
  summaryKeys: Array as PropType<string[]>
} as const

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>
