import {
  componentSizes,
  datePickTypes,
  type DatePickType
} from 'shared'
import type { ComponentSize } from 'shared'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: any): val is DatePickType =>
  datePickTypes.has(val)
