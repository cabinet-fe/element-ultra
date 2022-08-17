import type { ExtractPropTypes, PropType } from 'vue'
import type { DateCell } from '../date-picker.type'

export const basicCellProps = ({
  cell: {
    type: Object as PropType<DateCell>
  }
} )

export type BasicCellProps = ExtractPropTypes<typeof basicCellProps>
