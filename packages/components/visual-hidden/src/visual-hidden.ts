
import type { PropType, StyleValue } from 'vue'

export const visualHiddenProps = ({
  style: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: () => ({}),
  },
} )
