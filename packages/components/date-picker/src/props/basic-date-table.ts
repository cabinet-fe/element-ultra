
import { datePickerSharedProps, selectionModeWithDefault } from './shared'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Dayjs } from 'dayjs'

export const basicDateTableProps = ({
  ...datePickerSharedProps,
  cellClassName: {
    type: Function as PropType<(date: Date) => string>,
  },
  showWeekNumber: Boolean,
  selectionMode: selectionModeWithDefault('date'),
} )

export type BasicDateTableProps = ExtractPropTypes<typeof basicDateTableProps>

export type RangePickerEmits = { minDate: Dayjs; maxDate: null }
export type DatePickerEmits = Dayjs
export type DatesPickerEmits = Dayjs[]
export type WeekPickerEmits = {
  year: number
  week: number
  value: string
  date: Dayjs
}

export type DateTableEmits =
  | RangePickerEmits
  | DatePickerEmits
  | DatesPickerEmits
  | WeekPickerEmits
