import { datePickerSharedProps, selectionModeWithDefault } from './shared'

import type { ExtractPropTypes } from 'vue'

export const basicMonthTableProps = {
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault('month')
}

export type BasicMonthTableProps = ExtractPropTypes<typeof basicMonthTableProps>
