import type { ExtractPropTypes, PropType } from 'vue'

export const tableSelectDisplayProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  },
  value: {
    type: Object,
  },
  api: {
    type: String,
    default: ''
  },
  theight: {
    type: [Number, String]
  },
  editable: Boolean
}

export type TableSelectDisplayProps = ExtractPropTypes<typeof tableSelectDisplayProps>
