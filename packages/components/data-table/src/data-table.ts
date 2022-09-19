import type { ComponentSize } from '@element-ultra/constants'
import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

/** 数据表格列 */
export type DataTableColumn = {
  /** 是否固定 */
  fixed?: 'left' | 'right'
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
  sort?: boolean
  /** 自定义渲染 */
  render?: (val: any, row: any, index: number) => any
  /** 子列 */
  children?: DataTableColumn[]
  /** 插槽名称, 开启将会有个默认插槽 */
  slot?: string
}

export const dataTableProps = {
  /** 列配置 */
  columns: {
    type: Array as PropType<DataTableColumn[]>,
    required: true
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

  /** 显示表尾合计行 */
  showSummary: Boolean,

  /** 指定合计的列, 指定showSummary时该字段必填  */
  summaryKeys: Array as PropType<string[]>
} as const

export const dataTableEmits = {
  'columns-change': () => true,
  check: (checked: any[]) => true,
  select: (selection: any) => true
}

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

export type DataTableEmits = EmitFn<typeof dataTableEmits>
