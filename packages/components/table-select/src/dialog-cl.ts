import type { ExtractPropTypes, PropType } from 'vue'

export const dialogClProps = {
  // modelValue: {
  //   type: Array as PropType<Record<string, any>[]>,
  //   required: true
  // },
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  }
} as const

export type DialogClProps = ExtractPropTypes<typeof dialogClProps>
