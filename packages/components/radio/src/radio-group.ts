import { SizeProp } from '@element-ultra/shared'
import type { ExtractPropTypes } from 'vue'
import { FORM_COMPONENT_PROPS } from '@element-ultra/shared'
import type { PropType } from 'vue'

export const radioGroupProps = {
  ...FORM_COMPONENT_PROPS,
  size: SizeProp,
  disabled: {
    type: Boolean,
    default: undefined
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  },
  fill: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  }
} as const

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
