import type { ExtractPropTypes, PropType } from 'vue'

export const multipleFormProps = {
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

  width: String || Number,
  // height:String | Number,
  // maxHeight:String | Number,

  /** 是否编辑 */
  editable: Boolean
} as const

/** 列配置 */
export interface MultipleFormColumn {
  name: string
  key: string
  rules?: Partial<MultipleFormRules>,
  align?: 'left' | 'center' | 'right'
  width?: number
  render?: (val: string | number, row: any, index: number) => string
}

/** 列校验 */
export interface MultipleFormRules {
  /** 是否必填 */
  required: boolean | [boolean, string]
  /** 长度 */
  length: number | [number, string]
  /** 最小值  */
  min: number | [number , string]
  /** 最大值  */
  max: number | [number , string]
  /** 正则表达式 */
  match: RegExp | [RegExp , string]
  /** 自定义验证 */
  validator(value: any, model: Record<string, any>, rule: any)
}

export type MultipleFormProps = ExtractPropTypes<typeof multipleFormProps>
