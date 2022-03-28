import type { ExtractPropTypes, PropType } from "vue"

export const editBarProps = {
  /** 是否可排序 */
  sortable: Boolean,
  /** 默认数据 */
  data: Array as PropType<any[]>,
  /** 值的标识 */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 标签的标识 */
  labelKey: {
    type: String,
    default: 'label'
  }
} as const


export type EditBarProps =  ExtractPropTypes<typeof editBarProps>