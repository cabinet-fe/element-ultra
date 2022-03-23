import type { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@vue/shared'
export interface TreeOptionProps {
  children?: string
  label?: string
  value?: string
  disabled?: string
}


export const treeSelectProps = {
  modelValue: {
    type: String
  },

  data: {
    type: Array as PropType<TreeOptionProps[]>,
    default: [{
      label: 'root',
      children: [{
        label: 'branch',
        children: [{
          label: 'leaf'
        }]
      }]
    }]
  },

  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu'>,
    default: 'click'
  },

  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
} as const

export const treeSelectEmits = {
  input: (value: string) => isString(value)
}
export type TreeSelectEmits = typeof treeSelectEmits


export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
