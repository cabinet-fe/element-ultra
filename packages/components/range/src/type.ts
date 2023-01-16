import type { ExtractPropTypes, PropType } from 'vue'
import type { EmitFn } from '@element-ultra/utils'

export const rangeProps = {
  modelValue: {
    type: Array as unknown as PropType<[number | null, number | null]>,
  }
} as const
export const rangeEmits = {
  'update:modelValue': (value: [number | null, number | null]) => true
}
export type RangeProps = ExtractPropTypes<typeof rangeProps>

export type RangeEmits = EmitFn<typeof rangeEmits>