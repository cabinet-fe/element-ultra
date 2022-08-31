import type { ExtractPropTypes, PropType } from 'vue'
import type { EmitFn } from '@element-ultra/utils'
import { FORM_COMPONENT_PROPS, SizeProp } from '@element-ultra/constants'

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

} as const
export const batchInputEmits = {
  'update:modelValue': (value: any[]) => true
}
export type BatchInputProps = ExtractPropTypes<typeof batchInputProps>

export type BatchInputEmits = EmitFn<typeof batchInputEmits>