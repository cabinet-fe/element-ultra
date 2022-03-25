import type { ValueKeyIteratee } from 'lodash'
import type { ExtractPropTypes, PropType } from 'vue'
export interface TreeOptionProps {
  children?: string
  label?: string
  value?: string
  disabled?: string
}

export const treeSelectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType< any[] | string | number>,
  },

  childrenKey: {
    type: String,
    default: 'chidlren'
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'label'
  },

  multiple: {
    type: Boolean,
    default: false
  },

  data: {
    type: Array as PropType<TreeOptionProps[]>,
    default: () => [],
  },

  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },

  isize: {
    type: String as PropType<'large'|'default'|'small'>,
    default: 'default'
  },

  clearable: {
    type: Boolean,
    default: false
  }
} as const


export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
