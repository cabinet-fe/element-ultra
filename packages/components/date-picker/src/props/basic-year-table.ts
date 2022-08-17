import { datePickerSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'

const { date, disabledDate, parsedValue } = datePickerSharedProps

export const basicYearTableProps = {
  date,
  disabledDate,
  parsedValue
}

export type BasicYearTableProps = ExtractPropTypes<typeof basicYearTableProps>
