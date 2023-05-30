import { iconPropType } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ObjectFitProperty } from 'csstype'
import type Avatar from './avatar.vue'

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<'large' | 'default' | 'small'>,
    default: 'default',
    validator: (val: unknown): val is number => typeof val === 'number'
  },
  shape: {
    type: String as PropType<'circle' | 'square'>,

    default: 'circle'
  },
  icon: {
    type: iconPropType
  },
  src: {
    type: String,
    default: ''
  },
  alt: String,
  srcSet: String,
  fit: {
    type: String as PropType<ObjectFitProperty>,
    default: 'cover'
  }
}
export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event
}
export type AvatarEmits = typeof avatarEmits

export type AvatarInstance = InstanceType<typeof Avatar>
