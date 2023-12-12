import { FORM_COMPONENT_PROPS, type ComponentSize } from '@element-ultra/shared'
import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const checkboxGroupProps = {
  ...FORM_COMPONENT_PROPS,
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  disabled: Boolean,
  max: {
    type: Number,
    default: undefined
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  },

  tag: {
    type: String,
    default: 'div'
  },
  items: {
    type: Array as PropType<{ value: string | number, label: string }[]>
  }
}

export const checkboxGroupEmit = {
  'update:modelValue': (v: (string | number)[]) => true,
  change: (v: (string | number)[], label: (string | number)[]) => true
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxGroupEmit = EmitFn<typeof checkboxGroupEmit>
