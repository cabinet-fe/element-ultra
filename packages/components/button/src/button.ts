import { SizeProp } from '@element-ultra/constants'
import { Loading } from '@element-plus/icons-vue'
import type { Component, ExtractPropTypes, PropType } from 'vue'
import type button from './button.vue'

export type ButtonTypes = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'

export const buttonProps = {
  size: SizeProp,
  disabled: Boolean,
  type: {
    type: String as PropType<ButtonTypes>,
  },
  text: Boolean,
  icon: {
    type: [String, Object, Function] as PropType<string | Component>,
    default: ''
  },
  loading: Boolean,
  loadingIcon: {
    type: [String, Object, Function] as PropType<string | Component>,
    default: () => Loading
  },
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String
}
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonInstance = InstanceType<typeof button>

export interface ButtonConfigContext {
  autoInsertSpace?: boolean
}
