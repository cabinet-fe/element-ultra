import { UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import type { ExtractPropTypes, PropType } from 'vue'

export const calendarProps = {
  modelValue: {
    type: Date
  },
  range: {
    type: Array as unknown as PropType<[Date, Date]>,
    validator: (range: unknown): range is [Date, Date] =>
      Array.isArray(range) &&
      range.length === 2 &&
      range.every(item => item instanceof Date)
  }
}
export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: Date) => value instanceof Date,
  input: (value: Date) => value instanceof Date
}
export type CalendarEmits = typeof calendarEmits
