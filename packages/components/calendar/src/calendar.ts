import { buildProps, definePropType } from '@element-ultra/utils'
import { UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import type { ExtractPropTypes } from 'vue'

export const calendarProps = buildProps({
  modelValue: {
    type: Date,
  },
  range: {
    type: definePropType<[Date, Date]>(Array),
    validator: (range: unknown): range is [Date, Date] =>
      Array.isArray(range) &&
      range.length === 2 &&
      range.every((item) => item instanceof Date),
  },
} as const)
export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: Date) => value instanceof Date,
  input: (value: Date) => value instanceof Date,
}
export type CalendarEmits = typeof calendarEmits
