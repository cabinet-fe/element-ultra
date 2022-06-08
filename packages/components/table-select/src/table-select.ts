import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectProps = {
  modelValue: {
    type: [Object, Array] as PropType<Record<string, any> | Record<string, any>[]>
  },
  columns: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  data: {
    type: Array as PropType<Record<string, any>[]>
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
  },
  dialogWidth: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export type TableSelectProps = ExtractPropTypes<typeof tableSelectProps>

type EmitValue = Record<string, any> |  Record<string, any>[]

export const tableSelectEmits = {
  'update:modelValue': (v: EmitValue) => true,
  'change': (v: EmitValue) => true
}

export type TableSelectEmits = EmitFn<typeof tableSelectEmits>