import { componentSizes, FORM_COMPONENT_PROPS } from '@element-ultra/constants'
import type { PropType } from 'vue'

export const inputNumberProps = {
  ...FORM_COMPONENT_PROPS,
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  modelValue: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<typeof componentSizes[number]>,
    default: 'default'
  },
  money: Boolean,
  controls: {
    type: Boolean,
    default: false
  },
  placeholder: String,
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10)
  },
  append: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export const inputNumberEmits = {
  change: (newVal?: number, oldVal?: number) => true,

  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  input: (val?: number) => true,
  'update:modelValue': (val?: number) => true
}
