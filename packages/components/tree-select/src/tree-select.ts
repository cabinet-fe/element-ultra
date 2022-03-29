import type { ExtractPropTypes, PropType } from 'vue'
export interface TreeOptionProps {
  children?: string
  label?: string
  value?: string
  disabled?: string
}

export const treeSelectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<any[] | string | number>,
  },

  childrenKey: {
    type: String,
    default: 'children',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },

  multiple: {
    type: Boolean,
    default: false,
  },

  data: {
    type: Array as PropType<TreeOptionProps[]>,
    default: () => [],
  },

  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },

  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },

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

  clearable: {
    type: Boolean,
    default: false,
  },

  checkStrictly: {
    type: Boolean,
    default: false,
  },

  placeholder: {
    type: String,
    default: '请输入',
  },
} as const

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
