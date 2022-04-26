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

  /** 编辑时的默认值 */
  defaultValue?: string | number | boolean

  /** 提示消息 */
  tips?: string

  /** 是否在列中显示 */
  visible?: boolean

  /** 自定义渲染 */
  render?: (val: string | number, row: any, index: number) => string
}

export const multipleFormProps = {
  /** 列表数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true
  },

  /** 是否显示新增按钮 */
  createBtnText: {
    type: [String, Boolean] as PropType<string | false>,
    default: '新增'
  },

  /** 列配置  */
  columns: {
    type: Array as PropType<MultipleFormColumn[]>,
    required: true
  },

  /** 设置表单固定高度 */
  height: {
    type: String as PropType<string>
  },

  mode: {
    type: String as PropType<'inline' | 'dialog' | 'custom'>,
    default: 'inline'
  },

  title: {
    type: String
  },

  actionWidth: {
    type: Number,
    default: 120
  }
} as const

export const multipleFormEmits = {
  save: (row: any, rows: any[]) => true,
  delete: (row: any) => true,
  change: (rows: any[]) => true
}

export type MultipleFormProps = ExtractPropTypes<typeof multipleFormProps>

export type MultipleFormEmits = EmitFn<typeof multipleFormEmits>
