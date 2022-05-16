import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectProps = {
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    required: true
  },
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
  },
  multiple: {
    type: Boolean,
    default: false
  },
  api: {
    type: String,
    default: ''
  },
  pagination: {
    type: Boolean,
    default: false
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  stripe: {
    type: Boolean,
    default: true
  },
  query: {
    type: Object as PropType<Record<string, any>>
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  dialogTitle: {
    type: String,
    default: ''
  },
  theight: {
    type: Number
  },
  editable: {
    type: Boolean,
    default: true
  },
  table: {
    type: Boolean,
    default: true
  }
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>
