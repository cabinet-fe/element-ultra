import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ProTableColumn } from '@element-ultra/components/pro-table'

export interface TableSelectColumn extends ProTableColumn {}

export const tableSelectProps = {
  /** 选择的值 */
  modelValue: {
    type: [Object, Array] as PropType<Record<string, any> | Record<string, any>[]>
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
  /** 弹框高度 */
  theight: {
    type: Number
  },

  /** 是否显示展示的表格 */
  table: {
    type: Boolean,
    default: true
  },
  /** 弹框宽度 */
  dialogWidth: {
    type: [String, Number] as PropType<string | number>
  },
  /** 过滤列, (仅过滤弹框中的列) */
  columnFilter: {
    type: Function as PropType<(column: TableSelectColumn) => boolean>
  },

  /** 是否可选择 */
  disabled: Boolean
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>

type EmitValue = Record<string, any> |  Record<string, any>[]

export const tableSelectEmits = {
  'update:modelValue': (v: EmitValue) => true,
  'change': (v: EmitValue) => true
}

export type TableSelectEmits = EmitFn<typeof tableSelectEmits>