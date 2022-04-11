import { FORM_COMPONENT_PROPS } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export const treeSelectProps = {
  ...FORM_COMPONENT_PROPS,
  // common
  modelValue: {
    type: [String, Number, Array] as PropType<(string | number)[] | string | number>
  },
  multiple: {
    type: Boolean,
    default: false
  },

  // input
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },

  tagHit: {
    type: Boolean,
    default: false
  },

  // tree
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  childrenKey: {
    type: String,
    default: 'children'
  },
  disabledKey: {
    type: String,
    default: 'disabled'
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  checkStrictly: {
    type: Boolean,
    default: false
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
