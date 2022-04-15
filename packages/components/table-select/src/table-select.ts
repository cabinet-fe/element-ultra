import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectProps = {
  modelValue: {
    type: Object as PropType<Record<string, any>[] | Record<string, any>>,
    required: true
  },
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>
