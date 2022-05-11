import type { ExtractPropTypes } from "vue"

export const gridInputProps = {
  /** 值 */
  modelValue: {
    type: String,
    default: ''
  },
  /** 分隔符 */
  separator: {
    type: String,
    default: '-'
  },

  /** 最大个数 */
  max: {
    type: Number,
    default: 5
  },

  /** 能否输入0 */
  zero: {
    type: Boolean,
    default: false
  }
} as const

export type GridInputProps = ExtractPropTypes<typeof gridInputProps>