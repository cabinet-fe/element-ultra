import type { ExtractPropTypes, PropType } from 'vue'
import type { DataTableColumn } from '../../data-table/src/data-table'

export const proTableProps = {
  /** 数据请求接口, 如果传了data属性, 该属性将失效 */
  api: {
    type: String
  },
  /** 数据 */
  data: {
    type: Array as PropType<any[]>
  },
  /** 列配置 */
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    required: true
  },
  /** 在左侧展现索引 */
  showIndex: {
    type: Boolean
  },
  /** 显示复选框与selectable属性互斥, 只有一个生效 */
  checkable: {
    type: [Boolean, Function] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >
  },
  /** 显示单选框与checkable属性互斥, 只有一个生效 */
  selectable: {
    type: [Boolean, Function] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >
  },
  /** 展现分页 */
  pagination: Boolean,
  /** 检索对象, 传入table来让table自动帮你筛选数据 */
  query: {
    type: Object as PropType<Record<string, any>>
  },
  /** 表格高度, 一旦指定表头就会固定了 */
  height: {
    type: [Number, String] as PropType<string | number>
  },

  /** 默认显示 */
  showTools: {
    type: Boolean,
    default: true
  },
  /** 是否默认展开全部 */
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  /** 单元格最小宽度, 默认 100 */
  cellMinWidth: {
    type: Number,
    default: 100
  },

  /** 查询项数量限制, 超出的会被隐藏, 默认2 */
  searcherLimit: {
    type: Number,
    default: 2
  },

  /** 显示合计 */
  showSummary: Boolean
}

/** 专业数据表格类配置 */
export interface ProTableColumn extends DataTableColumn {
  /** 定义此列的动态插槽 */
  slot?: string
  children?: ProTableColumn[]
}

/** 专业表格属性 */
export type ProTableProps = ExtractPropTypes<typeof proTableProps>
