import { isString } from '@vue/shared'
import {
  buildProps,
  definePropType,
  iconPropType,
  mutable,
} from '@element-pro/utils'
import { UPDATE_MODEL_EVENT } from '@element-pro/constants'
import type { StyleValue, ExtractPropTypes } from 'vue'

type AutoSize = { minRows?: number; maxRows?: number } | boolean

export const textareaProps = buildProps({
  disabled: Boolean,
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: '',
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  autosize: {
    type: definePropType<AutoSize>([Boolean, Object]),
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  form: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },

  showWordLimit: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
  },
  tabindex: {
    type: [Number, String],
  },
  innerStyle: {
    type: definePropType<StyleValue>([Object, Array, String]),
    default: () => mutable({} as const),
  },
} as const)
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
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}
export type TextareaEmits = typeof textareaEmits
