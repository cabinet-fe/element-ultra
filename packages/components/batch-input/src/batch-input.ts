import type { ExtractPropTypes, PropType } from 'vue'
import type { EmitFn } from '@element-ultra/utils'

export const batchInputProps = {
  modelValue: {
    type: Array as PropType<any[]>
  },
  /** 主健字段 */
  key: {
    type: String,
  }
} as const
export const batchInputEmits = {
  'update:modelValue': (value: any[]) => true
}
export type BatchInputProps = ExtractPropTypes<typeof batchInputProps>

export type BatchInputEmits = EmitFn<typeof batchInputEmits>