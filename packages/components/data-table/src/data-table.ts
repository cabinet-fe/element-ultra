import { buildProps } from '@element-pro/utils'
import type { ExtractPropTypes, PropType, VNode } from 'vue'

/** 数据表格列 */
export interface DataTableColumn {
  /** 列的名称, 在表头中显示 */
  name: string | (() => VNode)
  /** 从值中取的字段, 支持链式 */
  key: string
  /** 是否支持排序 */
  sort?: boolean
  /** 自定义渲染 */
  render?: () => any
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 是否固定 */
  fixed?: 'left' | 'right'
  /** 子列 */
  children?: DataTableColumn[]
}

export const dataTableProps = buildProps({
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
} as const)

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>
