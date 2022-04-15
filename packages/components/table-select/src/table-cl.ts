import type { ExtractPropTypes, PropType } from 'vue'

export const tableClProps = {
  modelValue: {
    type: [Array, Object] as PropType<Record<string, any>[] | Record<string, any>>
  },
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  }
} as const

export type TableClProps = ExtractPropTypes<typeof tableClProps>
