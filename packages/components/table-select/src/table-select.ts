import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<(string | number)[] | string | number>
  }
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>
