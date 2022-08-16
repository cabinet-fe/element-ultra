import type { SVGAttributes, ExtractPropTypes, PropType } from 'vue'

type Color = { color: string; percentage: number }
type ProgressFn = (percentage: number) => string

export const progressProps = {
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle', 'dashboard']
  },
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100
  },
  status: {
    type: String,
    default: '',
    values: ['', 'success', 'exception', 'warning']
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  strokeLinecap: {
    type: String as PropType<NonNullable<SVGAttributes['stroke-linecap']>>,
    default: 'round'
  },
  textInside: {
    type: Boolean,
    default: false
  },
  textSize: {
    type: Number,
    default: 12
  },
  width: {
    type: Number
  },
  showText: {
    type: Boolean,
    default: true
  },
  color: {
    type: [String, Array, Function] as PropType<string | Color[] | ProgressFn>,
    default: ''
  },
  format: {
    type: Function as PropType<ProgressFn>,
    default: (percentage: number): string => `${percentage}%`
  }
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
