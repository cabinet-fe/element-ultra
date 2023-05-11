import type { ExtractPropTypes, PropType } from 'vue'
import type { EmitFn } from 'utils'
import { FORM_COMPONENT_PROPS, SizeProp } from 'shared'

export const batchInputProps = {
  ...FORM_COMPONENT_PROPS,
  size: SizeProp,
  placeholder: {
    type: String,
    default: '新增'
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  modelValue: {
    type: Array as PropType<any[]>
  },
  max: {
    type: Number,
  }
} as const
export const batchInputEmits = {
  'update:modelValue': (value: any[]) => true
}
export type BatchInputProps = ExtractPropTypes<typeof batchInputProps>

export type BatchInputEmits = EmitFn<typeof batchInputEmits>