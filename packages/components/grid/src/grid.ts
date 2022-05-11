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
