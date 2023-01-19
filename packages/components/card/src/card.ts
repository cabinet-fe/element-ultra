import type Card from './card.vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const cardProps = {
  header: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String as PropType<'always' | 'none' | 'hover'>,
    default: 'always'
  },
  tips: {
    type: String
  },
}
export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = InstanceType<typeof Card>
