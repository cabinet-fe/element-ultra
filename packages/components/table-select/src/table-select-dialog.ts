import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectDialogProps = {
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
  },
  api: {
    type: String,
    default: ''
  },
  query: {
    type: Object as PropType<Record<string, any>>
  },
} as const

export type TableSelectDialogProps = ExtractPropTypes<typeof tableSelectDialogProps>
