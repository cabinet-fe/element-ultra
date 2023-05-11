import { SizeProp } from 'shared'
import type { EmitFn } from 'utils'
import type { ExtractPropTypes, PropType } from 'vue'

export type SummaryMethod = (ctx: {
  key: string
  data: any[]
  total: number
}) => any

/** 表格列 */
export interface TableColumn<Row extends Record<string, any> = any> {
  /** 固定列 */
  fixed?: 'left' | 'right'
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 列的默认宽度 */
  width?: number
  /** 列的最小宽度 */
  minWidth?: number
  /** 列的名称, 在表头中显示 */
  name: string | (() => any)
  /** 从值中取的字段, 支持链式 */
  key: string
  /** 是否支持排序 */
  sortable?: boolean
  /** 自定义渲染 */
  render?: (ctx: {
    /** 单元格的值, 由column.key决定 */
    val: any
    /** val的别名，等同于val */
    v: any
    /** 行数据 */
    row: Row
    /** 行索引 */
    index: number
  }) => any
  /** 插槽名称, 开启将会有个默认插槽 */
  slot?: string
  /** 合计 */
  summary?: SummaryMethod | boolean
}

export interface FinalTableColumn extends TableColumn {
  name: () => any
  render: TableColumn['render'] & {}
  right?: number
  left?: number
  typeLast?: boolean
  typeFirst?: boolean
}

/** 表格行 */
export interface TableRow {
  /** 源数据 */
  data: any
  /** 行唯一标识 */
  id: number
  /** 是否展开 */
  expanded: boolean
  /** 是否是叶子节点 */
  leaf: boolean
  /** 子行 */
  children?: TableRow[]
}

export const tableProps = {
  /** 表格尺寸 */
  size: SizeProp,

  /** 表格列 */
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },

  /** 表格数据， 支持传入树形数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },

  /** 行class */
  rowClass: {
    type: [String, Function] as PropType<string | ((row: any) => string)>
  },

  /** 行唯一标识的key, 建议加上以提高性能 */
  rowKey: {
    type: String
  },

  /** 数据为空时显示的文本 */
  emptyText: {
    type: String,
    default: '暂无数据'
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  'row-click': (ctx: { row: any; index: number }) => true,
  'row-focus': (ctx: { row: any; index: number }) => true,
  'row-blur': (ctx: { row: any; index: number }) => true
}

export type TableEmits = EmitFn<typeof tableEmits>
