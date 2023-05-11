import { iconPropType } from 'utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type Link from './link.vue'

export const linkProps = {
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'
    >,

    default: 'default'
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: { type: Boolean, default: undefined },
  href: { type: String, default: '' },
  icon: {
    type: iconPropType,
    default: ''
  }
}
export type LinkProps = ExtractPropTypes<typeof linkProps>

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type LinkEmits = typeof linkEmits

export type LinkInstance = InstanceType<typeof Link>
