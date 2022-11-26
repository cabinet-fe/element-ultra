import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumn } from '@element-ultra/components/table'
import { SizeProp } from '@element-ultra/constants'

export interface TableSelectColumn extends TableColumn {}

export const tableSelectProps = {
  /** 选择的值 */
  modelValue: {
    type: [Object, Array] as PropType<
      Record<string, any> | Record<string, any>[]
    >
  },
  /** 列, 属性可以查看pro-table的属性 */
  columns: {
    type: Array as PropType<TableSelectColumn[]>,
    required: true
  },
  dialogColumns: {
    type: Array as PropType<TableSelectColumn[]>
  },
  /** 弹框中可选择的数据 */
  data: {
    type: Array as PropType<Record<string, any>[]>
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 弹框中可选择的数据的请求接口, 可以在全局配置中设置请求方法 */
  api: {
    type: String,
    default: ''
  },
  /** 应用分页 */
  pagination: {
    type: Boolean,
    default: false
  },
  /** 显示序号 */
  showIndex: {
    type: Boolean,
    default: false
  },
  clearText: {
    type: String,
    default: '清空'
  },
  /** 查询对象, 从外部传进来 */
  query: {
    type: Object as PropType<Record<string, any>>
  },
  /** 值的key, 可用于回显时对对象的标记 */
  valueKey: {
    type: String,
    default: 'id'
  },
  /** 弹框标题 */
  dialogTitle: {
    type: String,
    default: ''
  },

  /** 是否隐藏显示的表格 */
  hide: {
    type: Boolean
  },
  /** 弹框宽度 */
  dialogWidth: {
    type: [String, Number] as PropType<string | number>
  },
  /** 过滤列, (仅过滤弹框中的列) */
  columnFilter: {
    type: Function as PropType<(column: TableSelectColumn) => boolean>
  },

  size: SizeProp,

  /** 是否禁用 */
  disabled: {
    type: Boolean
  },

  /** 是否可选择 */
  clearable: {
    type: Boolean
  },

  defaultPageSize: {
    type: Number,
    default: 20
  }
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>

export const tableSelectEmits = {
  'update:modelValue': (v: TableSelectProps['modelValue'] | null) => true,
  change: (v: TableSelectProps['modelValue'] | null) => true
}

export type TableSelectEmits = EmitFn<typeof tableSelectEmits>
