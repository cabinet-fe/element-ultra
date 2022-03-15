import type { ComponentSize } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type Form from './form.vue'
export type ModelValue = string | number | any[] | boolean

export interface FormModelItem {
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
    rule: FormRules[string]
  ): string | Promise<string>
}

export type FormRules = Record<
  string,
  Omit<FormModelItem, 'value' | 'trigger'>
>

export type FormModel = Record<string, FormModelItem>

export const elFormProps = {
  model: {
    type: Object as PropType<FormModel>,
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
  'ElInputNumber',
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

export type FormInstance = InstanceType<typeof Form>
