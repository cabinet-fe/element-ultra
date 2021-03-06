import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export interface CheckGroup {
  label: string
  items: Array<{
    label?: string
    value: string
  }>
}

export const checkboxGroupsProps = {
  groups: {
    type: Array as PropType<CheckGroup[]>,
    required: true
  },
  modelValue: Array as PropType<(string | number)[]>
} as const

export const checkboxGroupsEmits = {
  'update:modelValue': (checkedList: (string | number)[]) => true,
  'checked-change': (checked: boolean, value: string) => true
}

export type CheckboxGroupsProps = ExtractPropTypes<typeof checkboxGroupsProps>

export type CheckboxGroupsEmits = EmitFn<typeof checkboxGroupsEmits>