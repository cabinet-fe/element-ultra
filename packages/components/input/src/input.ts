import { isString } from '@vue/shared'
import { mutable } from '@element-ultra/utils'
import { FORM_COMPONENT_PROPS, UPDATE_MODEL_EVENT } from '@element-ultra/shared'
import { SizeProp } from '@element-ultra/shared'
import type { StyleValue, ExtractPropTypes, PropType, Component } from 'vue'

export const inputProps = {
  ...FORM_COMPONENT_PROPS,
  size: SizeProp,
  disabled: {
    type: Boolean,
    default: undefined
  },

  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
    required: false
  },

  autocomplete: {
    type: String,
    default: 'off'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  form: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  suffixIcon: {
    type: [String, Object, Function] as PropType<Component | string>,
    default: ''
  },
  prefixIcon: {
    type: [String, Object, Function] as PropType<Component | string>,
    default: ''
  },
  tabindex: {
    type: [Number, String] as PropType<string | number>
  },

  innerStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => mutable({} as const)
  }
} as const
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => true,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
}
export type InputEmits = typeof inputEmits
