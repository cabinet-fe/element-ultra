import { SizeProp } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'

/** 表格列 */
export interface TableColumn {
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
    row: any
    /** 行索引 */
    index: number
    /** 行包装器 */
    wrap: any
  }) => any
  /** 插槽名称, 开启将会有个默认插槽 */
  slot?: string
}

/** 表格行 */
export interface TableRow {
  /** 源数据 */
  data: any;
  /** 行唯一标识 */
  id: number;
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

  /** 展示树形数据 */
  tree: {
    type: Boolean
  },

  /** 如果树形数据的字段不是children那么需要指定 */
  childrenKey: {
    type: String,
    default: 'children'
  },


}

export type TableProps = ExtractPropTypes<typeof tableProps>
