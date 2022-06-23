import {  isObject } from '@element-ultra/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Dayjs } from 'dayjs'

export const dateTableProps = ({
  selectedDay: {
    type: Object as PropType<Dayjs>,
  },
  range: {
    type: Array as unknown as PropType<[Dayjs, Dayjs]>,
  },
  date: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  hideHeader: {
    type: Boolean,
  },
} )
export type DateTableProps = ExtractPropTypes<typeof dateTableProps>

export const dateTableEmits = {
  pick: (value: Dayjs) => isObject(value),
}
export type DateTableEmits = typeof dateTableEmits
