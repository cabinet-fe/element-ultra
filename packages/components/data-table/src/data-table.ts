import type { TableColumn } from '@element-ultra/components/table'
import type { ComponentSize } from '@element-ultra/shared'
import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

/** 数据表格列 */
export interface DataTableColumn extends Omit<TableColumn, 'render'> {
  /** 预设 */
  preset?: string
  /** 子列 */
  children?: DataTableColumn[]
  /** 渲染 */
  render?: (ctx: {
    val: any
    v: any
    row: Record<string, any>
    index: number
    wrap: DataTreeRow | Row
  }) => any
}

export const dataTableProps = {
  /** 列配置 */
  columns: {
    type: Array as PropType<DataTableColumn[]>,
    required: true
  },

  /** 默认展开树形菜单 */
  defaultExpandAll: {
    type: Boolean
  },

  /** 指定表格为树形结构 */
  tree: {
    type: [Boolean, String] as PropType<boolean | string>
  },

  /** 表格数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },

  /** 列最小宽度 */
  columnMinWidth: {
    type: Number,
    default: 100
  },

  /** 尺寸 */
  size: {
    type: String as PropType<ComponentSize>
  },

  /** 是否多选 */
  checkable: {
    type: [Function, Boolean] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >,
    default: false
  },

  /** 多选数据 */
  checked: {
    type: Array as PropType<any[]>
  },

  /** 是否可以单选 */
  selectable: {
    type: [Function, Boolean] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >,
    default: false
  },

  /** 单选数据 */
  selected: {
    type: Object
  },

  /** 显示序号, 可以指定continuos来表示连续的字段, 这样就算跨页也能持续 */
  showIndex: {
    type: Boolean,
    default: false
  },

  /** 在浏览器滚动期间等待cpu闲置 */
  idle: {
    type: Boolean
  },

  /** 显示表尾合计行 */
  showSummary: Boolean,

  /** 合计方式 */
  summaryMethod: {
    type: Function as PropType<
      (ctx: { columns: DataTableColumn[]; data: any[] }) => any[]
    >
  },

  /** 指定合计的列, 指定showSummary时该字段必填  */
  summaryKeys: Array as PropType<string[]>,

  /** 表格高度 */
  height: {
    type: String
  },

  /** 响应式数据项 */
  itemReactive: {
    type: Boolean
  },

  /** 数据懒加载 */
  lazyLoad: {
    type: Function as PropType<
      (data: Record<string, any>, row: DataTreeRow) => any[] | Promise<any[]>
    >
  }
} as const

export const dataTableEmits = {
  'row-click': (row: any, rowIndex: number) => true,
  check: (checked: any[]) => true,
  select: (selection: any) => true,
  sort: (sortKeys: Record<string, 'asc' | 'dsc' | 'default'>) => true,
  'row-expand': (data: Record<string, any>, row: DataTreeRow) => true
}

export interface Row {
  uid: number
  data: any
  index: number
}
export interface DataTreeRow extends Row {
  expanded: boolean
  loaded: boolean
  loading: boolean
  depth: number
  children?: DataTreeRow[]
}

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

export type DataTableEmits = EmitFn<typeof dataTableEmits>
