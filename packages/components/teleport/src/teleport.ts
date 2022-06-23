import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export const elTeleportProps = {
  container: {
    type: String as PropType<string>,
    default: 'body'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: {
    type: [String, Array, Object] as PropType<StyleValue>
  },
  zIndex: {
    type: String,
    default: '2000'
  }
}

export type ElTeleportProps = ExtractPropTypes<typeof elTeleportProps>
