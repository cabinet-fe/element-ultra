import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectDialogProps = {
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
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
  title: {
    type: String
  },
  theight: {
    type: Number,
    default: 300
  },
  table: {
    type: Boolean
  },
  width: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export type TableSelectDialogProps = ExtractPropTypes<typeof tableSelectDialogProps>
