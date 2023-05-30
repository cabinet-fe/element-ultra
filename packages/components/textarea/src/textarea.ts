import { isString } from '@vue/shared'

import {
  FORM_COMPONENT_PROPS,
  UPDATE_MODEL_EVENT
} from '@element-ultra/shared'
import type { StyleValue, ExtractPropTypes, PropType } from 'vue'

type AutoSize = { minRows?: number; maxRows?: number } | boolean

export const textareaProps = {
  ...FORM_COMPONENT_PROPS,
  disabled: {
    type: Boolean,
    default: undefined
  },
  modelValue: {
    type: [String, Number] as PropType<string | number | null | undefined>,
    default: ''
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical']
  },
  autosize: {
    type: [Boolean, Object] as PropType<AutoSize>,
    default: false
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

  showWordLimit: {
    type: Boolean,
    default: false
  },

  tabindex: {
    type: [Number, String]
  },
  innerStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => ({})
  }
}
export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
}
export type TextareaEmits = typeof textareaEmits
