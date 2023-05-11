import { FORM_COMPONENT_PROPS } from 'shared'
import type { EmitFn } from 'utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { TreeNode } from 'components/tree'

export const treeSelectProps = {
  ...FORM_COMPONENT_PROPS,
  // common
  modelValue: {
    type: [String, Number, Array] as PropType<
      (string | number)[] | string | number
    >
  },
  multiple: {
    type: Boolean,
    default: false
  },

  size: {
    type: String as PropType<'large' | 'default' | 'small'>
  },

  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择'
  },

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined
  },

  tagHit: {
    type: Boolean,
    default: false
  },

  /** 选择的值的字段 */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 选择的文本的字段 */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** 选项中表示子元素的字段 */
  childrenKey: {
    type: String,
    default: 'children'
  },
  /** 多选数量限制 */
  multipleLimit: {
    type: Number
  },
  /** 数据选项 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  /** 是否严格选择 */
  checkStrictly: {
    type: Boolean,
    default: false
  },
  /** 树的缩进 */
  treeIndent: {
    type: Number,
    default: 16
  },
  /** 树的图标 */
  treeIcon: {
    type: String
  },
  /** 选项为空时显示的文本 */
  emptyText: {
    type: String
  },
  /** 高亮选中的节点 */
  highlightCurrent: {
    type: Boolean,
    default: true
  },
  /** 可选择配置 */
  selectable: {
    type: Function as PropType<(node: TreeNode) => boolean>
  },
  /** 回显的文本, 即选项中没有与modelValue匹配的数据时所显示的文本 */
  text: {
    type: String
  },
  /** 回落的文本的字段, 即选项中没有与modelValue匹配的数据时所显示的文本 */
  textField: {
    type: String
  }
} as const

export const treeSelectEmits = {
  'update:modelValue': (
    value: string | number | (string | number)[],
    label: string | string[],
    item: Record<string, any> | undefined | Record<string, any>[]
  ) => true,
  'update:text': (text: string | string[]) => true
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>

export type TreeSelectEmits = EmitFn<typeof treeSelectEmits>
