import type Card from './card.vue'
import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export const cardProps = {
  header: {
    type: String,
    default: ''
  },
  bodyStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  shadow: {
    type: String,
    default: 'always'
  },
  tips: {
    type: String
  }
}
export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = InstanceType<typeof Card>
