import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

/** 列校验 */
export type MultipleFormRules = {
  /** 是否必填 */
  required: boolean | [boolean, string]

  /** 长度 */
  length: number | [number, string]

  /** 最小值  */
  min: number | [number, string]

  /** 最大值  */
  max: number | [number, string]

  /** 正则表达式 */
  match: RegExp | [RegExp, string]

  /** 自定义验证 */
  validator: (
    value: any,
    model: Record<string, any>,
    list: Record<string, any>[]
  ) => Promise<string> | string
}

/** 列配置 */
export type MultipleFormColumn = {
  /** 列的名称, 在表头中显示 */
  name: string

  /** 从值中取的字段 */
  key: string

  /** 校验规则 */
  rules?: Partial<MultipleFormRules>

  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** 列的宽度 */
  width?: number

  /** 列的最小宽度 */
  minWidth?: number

  /** 编辑时的默认值, 可以传入一个函数异步也可以 */
  defaultValue?: any

  /** 提示消息 */
  tips?: string

  /** 是否在列中显示 */
  visible?: boolean

  /** 自定义渲染 */
  render?: (val: any, row: any, index: number) => any

  /** 对象嵌套 */
  nest?: MultipleFormColumn[]

  /** 合计 */
  summary?:
    | boolean
    | ((ctx: { total: number; key: string; data: any[] }) => number | string)
}

/** MultipleForm删除方法 */
export type MultipleFormDeleteMethod = (ctx: {
  /** 当前行的数据 */
  data: any
  /** 当前数据是否已保存过 */
  saved: boolean
  /** 当前行的索引路径 */
  indexes: number[]
  /** 当前行在同级中的索引 */
  index: number
}) => Promise<any> | any

/** MultipleForm保存方法 */
export type MultipleFormSaveMethod = (ctx: {
  /** 当前行的数据 */
  data: any
  /** 所有行 */
  rows: any[]
  /** 保存的类型 */
  type: 'create' | 'update'
  /** 父级数据 */
  parent?: any
  /** 当前行的索引路径 */
  indexes: number[]
  /** 当前行在同级中的路径 */
  index: number
}) => Promise<any> | any

export const multipleFormProps = {
  dialogWidth: {
    type: String
  },

  /** 删除方法 */
  deleteMethod: {
    type: Function as PropType<MultipleFormDeleteMethod>
  },

  /** 保存方法 */
  saveMethod: {
    type: Function as PropType<MultipleFormSaveMethod>
  },

  rowKey: {
    type: String
  },

  tree: {
    type: Boolean
  },

  /** 列表数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true
  },

  /** 列配置  */
  columns: {
    type: Array as PropType<MultipleFormColumn[]>,
    required: true
  },

  /** 模式 */
  mode: {
    type: String as PropType<'inline' | 'dialog'>,
    default: 'inline'
  },

  /** 编辑按钮是否可见 */
  actionEdit: {
    type: Boolean,
    default: true
  },

  /** 删除按钮是否可见 */
  actionDelete: {
    type: Boolean,
    default: true
  },

  disabled: {
    type: Boolean,
    default: undefined
  },

  title: {
    type: String
  },

  actionWidth: {
    type: Number,
    default: 120
  }
}

export const multipleFormEmits = {
  save: (row: any, rows: any[], type: 'create' | 'update', parent?: any) =>
    true,
  delete: (row: any) => true,
  change: (rows: any[]) => true,
  'update:data': (rows: any[]) => true
}

export type MultipleFormProps = ExtractPropTypes<typeof multipleFormProps>

export type MultipleFormEmits = EmitFn<typeof multipleFormEmits>

export type MultipleFormRow = {
  root: boolean
  /** 数据本身 */
  data: any
  /** 树深 */
  depth: number
  /** 是否是已保存的数据 */
  saved: boolean
  /** 行状态 */
  status: 'view' | 'editing'
  /** 行索引 */
  index: number
  /** 节点编号 */
  indexes: number[]
  /** 父节点 */
  parent: MultipleFormRow | null
  /** 子行 */
  children?: MultipleFormRow[]
  /** 进度中 */
  loading: boolean
}
