import type { ExtractPropTypes, PropType } from 'vue'

export type ResponsiveCols = {
  cols: number
  xs?: number
  s?: number
  m?: number
  l?: number
  xl?: number
  xxl?: number
}

export const gridProps = {
  /** 列数或者每一列在长度中的比例， 为数字时表示列数且等宽， 为数组表示每个元素列宽的值或者比例 */
  cols: {
    type: [Number, Array, String, Object] as PropType<string[] | number | string | ResponsiveCols>,
    default: 1
  },

  rows: {
    type: [Array, String] as PropType<string | any[]>
  },

  gap: {
    type: String,
    default: '8,12'
  },

  tag: {
    type: String,
    default: 'div'
  }
} as const

export type GridProps = ExtractPropTypes<typeof gridProps>
