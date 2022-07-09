import type { ExtractPropTypes, PropType } from 'vue'
import type { DataTableColumn } from '../../data-table/src/data-table'

export const proTableProps = {
  api: {
    type: String
  },

  data: {
    type: Array as PropType<any[]>
  },

  columns: {
    type: Array as PropType<ProTableColumn[]>,
    required: true
  },

  showIndex: {
    type: Boolean
  },

  checkable: {
    type: [Boolean, Function] as PropType<boolean | ((row: any, index: number) => boolean)>
  },

  selectable: {
    type: [Boolean, Function] as PropType<boolean | ((row: any, index: number) => boolean)>
  },

  pagination: Boolean,

  query: {
    type: Object as PropType<Record<string, any>>
  },

  height: {
    type: [Number, String] as PropType<string | number>
  },

  /** 默认显示 */
  showTools: {
    type: Boolean,
    default: true
  },

  defaultExpandAll: {
    type: Boolean,
    default: false
  },

  cellMinWidth: {
    type: Number,
    default: 100
  },

  /** 查询项数量限制, 超出的会被隐藏, 默认2 */
  searcherLimit: {
    type: Number,
    default: 2
  }
}

/** 专业数据表格类配置 */
export interface ProTableColumn extends DataTableColumn {
  /** 定义此列的动态插槽 */
  slot?: string
  children?: ProTableColumn[]
}

/** 专业表格属性 */
export type ProTableProps = ExtractPropTypes<typeof proTableProps>
