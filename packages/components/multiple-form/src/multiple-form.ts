import type { ExtractPropTypes, PropType } from 'vue'

export const multipleFormProps = {
  /** 列表数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },

  /** 列配置  */
  columns: {
    type: Array as PropType<any[]>,
    required: true,
  },

  /** 是否编辑 */
  editable:Boolean
} as const

interface tableItemData {
  /** 类型 */
  type: string
  /** 是否只读 */
  readonly?: boolean
  /** type:'select‘ || ’radio‘ */
  options?: tableOptions[]
  /** 操作 */
  actions: any[]
}

interface tableOptions {
  label: string
  value: string
}

export type MultipleFormProps = ExtractPropTypes<typeof multipleFormProps>
