import type { ExtractPropTypes } from 'vue'

export const gridProps = {
  cols: {
    type: Number,
    required: true,
  },

  gap: {
    type: String,
    default: '8,12',
  },

  tag: {
    type: String,
    default: 'div',
  },
}
export type GridProps = ExtractPropTypes<typeof gridProps>

export const gridEmits = {}
export type GridEmits = typeof gridEmits
