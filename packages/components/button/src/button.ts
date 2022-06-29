import { iconPropType } from '@element-ultra/utils'
import { Loading } from '@element-plus/icons-vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type button from './button.vue'
import { SizeProp } from '@element-ultra/constants'

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = {
  size: SizeProp,
  disabled: Boolean,
  type: {
    type: String as PropType<ButtonType>,
    default: ''
  },
  icon: {
    type: iconPropType,
    default: ''
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => Loading
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  dark: Boolean
} as const
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | ''
export type ButtonNativeType = ButtonProps['nativeType']

export type ButtonInstance = InstanceType<typeof button>
