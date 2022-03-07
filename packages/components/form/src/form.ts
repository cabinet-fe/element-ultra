import type { ComponentSize } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export type ModelValue = string | number | any[] | boolean

export interface ElFormModelItem {
  /** 表单默认值 */
  value?: any
  trigger?: 'change' | 'blur'

  /** 必填 */
  required?: boolean | [boolean, string]
  /** 指定长度 */
  len?: number | [number, string]
  /** 最小值或最小长度 */
  min?: number | [number, string]
  /** 最大值或最大长度 */
  max?: number | [number, string]
  /** 匹配正则表达式 */
  match?: RegExp | [RegExp, string]
  /** 自定义验证器 */
  validator?(
    value: any,
    model: Record<string, any>,
    rule: ElFormRules[string]
  ): string | Promise<string>
}

export type ElFormRules = Record<
  string,
  Omit<ElFormModelItem, 'value' | 'trigger'>
>

export type ElFormModel = Record<string, ElFormModelItem>

export const elFormProps = {
  model: {
    type: Object as PropType<ElFormModel>,
  },
  labelPosition: String as PropType<'left' | 'right' | 'top'>,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelSuffix: {
    type: String,
    default: '',
  },
  cols: {
    type: Number,
  },
  size: String as PropType<ComponentSize>,
  disabled: Boolean,
}

export type ElFormProps = ExtractPropTypes<typeof elFormProps>

export const elFormComponents = new Set([
  'ElInput',
  'ElTextarea',
  'ElSwitch',
  'ElSelect',
  'ElDatePicker',
  'ElTimePicker',
  'ElSlider',
  'ElCascade',
  'ElCheckbox',
  'ElCheckboxGroup',
  'ElRadio',
  'ElRadioGroup'
])
