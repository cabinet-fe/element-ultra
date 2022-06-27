import { FORM_COMPONENT_PROPS, type ComponentSize } from '@element-ultra/constants'
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
    type: String as PropType<ComponentSize>
  },
  /** 以金额显示 */
  money: Boolean,
  /** 是否显示控制按钮 */
  controls: {
    type: Boolean,
    default: false
  },
  placeholder: String,
  /** 精度 */
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10)
  },
  /** 是否可清除 */
  clearable: Boolean,
  /** 外部后插入值 */
  append: {
    type: [String, Number, Boolean] as PropType<string | number | false>,
    default: ''
  }
} as const

export const inputNumberEmits = {
  change: (newVal?: number, oldVal?: number) => true,

  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  input: (val?: number) => true,
  'update:modelValue': (val?: number) => true
}
