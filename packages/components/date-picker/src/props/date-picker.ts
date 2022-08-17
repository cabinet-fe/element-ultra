import type { ExtractPropTypes, PropType } from 'vue'
import type { IDatePickerType } from '../date-picker.type'

export const datePickerProps = {
  type: {
    type: String as PropType<IDatePickerType>,
    default: 'date'
  }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
