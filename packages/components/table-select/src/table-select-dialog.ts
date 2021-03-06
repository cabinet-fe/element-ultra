import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectDialogProps = {
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
  }
} as const

export type TableSelectDialogProps = ExtractPropTypes<typeof tableSelectDialogProps>
