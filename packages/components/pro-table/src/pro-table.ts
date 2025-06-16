import type { ExtractPropTypes, PropType } from 'vue'
import type {
  DataTableColumn,
  DataTableRow
} from '@element-ultra/components/data-table'
import type { RequestResponse } from '@element-ultra/hooks'
import type { EmitFn } from '@element-ultra/utils'

export const proTableProps = {
  /** 数据请求接口, 如果传了data属性, 该属性将失效 */
  api: {
    type: String
  },

  /** 缓存params */
  cacheParams: { type: Boolean },
  /** 展示树形数据 */
  tree: {
    type: [Boolean, String],
    default: false
  },
  /** 数据 */
  data: {
    type: Array as PropType<any[]>
  },
  /** 额外的请求信息 */
  requestExtra: {
    type: Object as PropType<Record<string, any>>
  },
  /** 列配置 */
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    required: true
  },

  columnsConfigurable: {
    type: [Boolean, String] as PropType<boolean | 'simple'>,
    default: false
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
  /** 多选选中的数据 */
  checked: {
    type: Array as PropType<any[]>
  },
  /** 单选选中的数据 */
  selected: {
    type: Object
  },
  /** 显示查询按钮, 默认会根据api属性和是否查询条件来判断 */
  showSearchButton: {
    type: Boolean,
    default: undefined
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
  fetch: {
    type: Function as PropType<
      (ctx: { api?: string; query: Record<string, any> }) => Promise<any>
    >
  },
  /** 表格高度, 一旦指定表头就会固定了 */
  height: {
    type: String
  },

  /** 汇总方法 */
  summaryMethod: {
    type: Function as PropType<
      (data: {
        columns: ProTableColumn[]
        data: any[]
        checked: Set<any>
      }) => string[]
    >
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

  /** 数据懒加载 */
  lazyLoad: {
    type: Function as PropType<
      (row: Record<string, any>) => any[] | Promise<any[]>
    >
  },

  /** 显示合计 */
  showSummary: Boolean,

  /** 数据项是否为响应式的 */
  itemReactive: Boolean,

  /** 合并单元格 */
  mergeCell: {
    type: Function as PropType<
      (
        row: DataTableRow,
        column: DataTableColumn,
        columnIndex: number
      ) =>
        | {
            rowspan: number
            colspan: number
          }
        | undefined
    >
  },

  /** 单元格类 */
  cellClass: {
    type: Function as PropType<
      (
        row: DataTableRow,
        column: DataTableColumn,
        columnIndex: number
      ) => string[]
    >
  }
}

export const proTableEmits = {
  check: (checked: any[]) => true,
  'update:checked': (checked: any[]) => true,
  select: (selected: any) => true,
  fetch: (query: Record<string, any>) => true,
  loaded: (res: RequestResponse) => true,
  'row-click': (row: any, rowIndex: number) => true
}

/** 专业数据表格类配置 */
export interface ProTableColumn extends DataTableColumn {
  /** 定义此列的动态插槽 */
  slot?: string
  preset?: string
  children?: ProTableColumn[]
}

/** 专业表格属性 */
export type ProTableProps = ExtractPropTypes<typeof proTableProps>

export type ProTableEmits = EmitFn<typeof proTableEmits>
