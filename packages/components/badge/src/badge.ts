import type { ExtractPropTypes, PropType } from 'vue'
import type Badge from './badge.vue'

export const badgeProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'info' | 'danger'
    >,

    default: 'danger'
  }
}
export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export type BadgeInstance = InstanceType<typeof Badge>
