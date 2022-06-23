import {
  componentSizes,
  datePickTypes,
  type DatePickType
} from '@element-ultra/constants'
import type { ComponentSize } from '@element-ultra/constants'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)

export const isValidDatePickType = (val: any): val is DatePickType =>
  datePickTypes.has(val)
