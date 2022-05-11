import { isNumber } from '@element-ultra/utils'
import { componentSizes, FORM_COMPONENT_PROPS } from '@element-ultra/constants'
import type { PropType } from 'vue'

export const inputNumberProps = {
  ...FORM_COMPONENT_PROPS,
  step: {
    type: Number,
    default: 1,
  },
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  modelValue: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<keyof typeof componentSizes>,
    default: ''
  },
  controls: {
    type: Boolean,
    default: true,
  },

  name: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10),
  },
} as const

export const inputNumberEmits = {
  change: (prev: number, cur: number) => prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  input: (val: number) => isNumber(val),
  'update:modelValue': (val: number | undefined) =>
    isNumber(val) || val === undefined,
}
