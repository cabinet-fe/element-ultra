import { isString } from '@vue/shared'
import { buildProps, definePropType, iconPropType, mutable } from '@element-ultra/utils'
import { UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import { useSizeProp } from '@element-ultra/hooks'
import type { StyleValue, ExtractPropTypes, PropType, Component } from 'vue'

// TODO 统一改掉useSizeProp等等
export const inputProps = {
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default' as 'default' | 'small' | 'large'
  },
  disabled: {
    type: Boolean
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
  label: {
    type: String
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

export type AA = {
  (e: 'test', name: string): void
}
