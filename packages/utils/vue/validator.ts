import {
  componentSizes,
  datePickTypes,
  type DatePickType
} from '@element-ultra/shared'
import type { ComponentSize } from '@element-ultra/shared'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: any): val is DatePickType =>
  datePickTypes.has(val)
