import type { ComponentSize } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ResponsiveCols } from '@element-ultra/components/grid'
import type Form from './form.vue'
export type ModelValue = string | number | any[] | boolean

export interface FormModelItem {
  /** 表单默认值 */
  value?: any
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

export type FormRules = Record<string, Omit<FormModelItem, 'value'>>

export type FormModel = Record<string, FormModelItem>

export const formProps = {
  data: {
    type: Object as PropType<Record<string, any>>
  },
  rules: {
    type: Object as PropType<FormRules>
  },
  labelPosition: String as PropType<'left' | 'right' | 'top'>,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  cols: {
    type: [Number, Array, String, Object] as PropType<string[] | number | string | ResponsiveCols>,
    default: { cols: 4, s: 1, m: 2, l: 3, xl: 4 }
  },
  size: String as PropType<ComponentSize>,
  disabled: Boolean
}

export type FormProps = ExtractPropTypes<typeof formProps>

export const formComponents = new Set([
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
  'ElRadioGroup',
  'ElTreeSelect',
  'ElTextEditor'
])

export type FormInstance = InstanceType<typeof Form>
