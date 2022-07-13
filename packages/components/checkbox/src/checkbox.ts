import { FORM_COMPONENT_PROPS, type ComponentSize } from '@element-ultra/constants'
import type { EmitFn } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const checkboxProps = {
  ...FORM_COMPONENT_PROPS,
  /** model值，具体值的类型与trueValue和falseValue挂钩 */
  modelValue: {
    type: [Boolean, Number, String]
  },
  /** 绑定的值，在button-group中有效 */
  value: {
    type: [String, Number]
  },
  indeterminate: Boolean,
  disabled: {
    type: Boolean,
    default: undefined
  },
  checked: Boolean,
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  },
  tabindex: [String, Number]
}

export const checkboxEmit = {
  'update:modelValue': (v: boolean | string | number) => true,
  change: (checked: boolean) => true
}

export type CheckboxEmit = EmitFn<typeof checkboxEmit>

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
