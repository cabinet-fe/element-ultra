import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

interface CheckGroup {
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
  'update:modelValue': (checked: (string | number)[]) => true
}

export type CheckboxGroupsProps = ExtractPropTypes<typeof checkboxGroupsProps>

export type CheckboxGroupsEmits = EmitFn<typeof checkboxGroupsEmits>