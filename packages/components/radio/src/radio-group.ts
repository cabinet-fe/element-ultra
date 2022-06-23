import { SizeProp } from '@element-ultra/constants'
import type { ExtractPropTypes } from '@vue/runtime-core'
import { FORM_COMPONENT_PROPS } from '@element-ultra/constants'
import type { PropType } from 'vue'

export const radioGroupProps = {
  ...FORM_COMPONENT_PROPS,
  size: SizeProp,
  disabled: Boolean,
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
