import type { ExtractPropTypes, PropType } from 'vue'

export const tableClProps = {
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  checkable: {
    type: Boolean,
    default: false
  }
} as const

export type TableClProps = ExtractPropTypes<typeof tableClProps>
