import { FORM_COMPONENT_PROPS } from '@element-ultra/constants'
import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

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

  // input
  size: {
    type: String as PropType<'large' | 'default' | 'small'>
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: undefined
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

  multipleLimit: {
    type: Number
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
  },
  selectable: {
    type: Function as PropType<(node: any) => boolean>
  }
} as const

export const treeSelectEmits = {
  'update:modelValue': (
    value: string | number | (string | number)[],
    label: string | string[],
    item: Record<string, any> | undefined | Record<string, any>[]
  ) => true
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>

export type TreeSelectEmits = EmitFn<typeof treeSelectEmits>
