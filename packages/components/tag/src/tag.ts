import type { ExtractPropTypes, PropType } from 'vue'

export const tagProps = {
  closable: Boolean,
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger' | ''>,
    default: ''
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>
  },
  effect: {
    type: String as PropType<'dark' | 'light' | 'plain'>,

    default: 'light'
  }
}
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type TagEmits = typeof tagEmits
