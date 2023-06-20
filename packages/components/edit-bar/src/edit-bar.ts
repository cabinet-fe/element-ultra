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
  },
  /** 子节点属性标识 */
  childrenKey: {
    type: String,
    default: 'children'
  },

  modelValue: {
    type: [String, Number] as PropType<string | number>,
  },

  /** 默认选中 */
  defaultSelect: {
    type: Boolean,
    default: true
  },

  /** 树形列表显示 */
  tree: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: '分类'
  }
} as const


export type EditBarProps =  ExtractPropTypes<typeof editBarProps>