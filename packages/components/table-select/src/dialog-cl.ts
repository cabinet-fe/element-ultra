import type { ExtractPropTypes, PropType } from 'vue'

export const dialogClProps = {
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  value: {
    type: Object as PropType<Record<string, any>>
  }
} as const

export type DialogClProps = ExtractPropTypes<typeof dialogClProps>
