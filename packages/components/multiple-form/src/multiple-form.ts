import type { ExtractPropTypes, PropType } from 'vue'


export const multipleFormProps = {
  /** 列表数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true
  },

  columns: {
    type: Array as PropType<any[]>,
    required: true
  }
} as const


export type MultipleFormProps = ExtractPropTypes<typeof multipleFormProps>
