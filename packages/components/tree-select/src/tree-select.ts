import type { ExtractPropTypes, PropType } from 'vue'
export interface TreeOptionProps {
  children?: string
  label?: string
  value?: string
  disabled?: string
}

export const treeSelectProps = {
  // common
  modelValue: {
    type: [String, Number, Array] as PropType<any[] | string | number>,
  },
  multiple: {
    type: Boolean,
    default: false,
  },

  // input
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // tag
  tagSize: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },
  tagType: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger'>,
    default: 'info'
  },
  tagHit: {
    type: Boolean,
    default: false
  },
  tagColor: {
    type: String
  },
  tagEffect: {
    type: String as PropType<'dark' | 'light' | 'plain'>,
    default: 'light'
  },

  // tree
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  disabledKey: {
    type: String,
    default: 'disabled'
  },
  data: {
    type: Array as PropType<TreeOptionProps[]>,
    default: () => [],
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  treeIndent: {
    type: Number,
    default: 16
  },
  treeIcon: {
    type: String
  },
  emptyText: {
    type: String
  },
  highlightCurrent: {
    type: Boolean,
    default: true
  }
} as const

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
