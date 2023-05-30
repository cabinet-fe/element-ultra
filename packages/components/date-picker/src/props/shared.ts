import { isArray } from '@element-ultra/utils'
import { type DatePickType } from '@element-ultra/shared'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Dayjs } from 'dayjs'

const selectionModes = [
  'date',
  'dates',
  'year',
  'month',
  'week',
  'range'
] as const

export type RangeState = {
  endDate: null | Dayjs
  selecting: boolean
}

export const datePickerSharedProps = {
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>
  },
  date: {
    type: Object as PropType<Dayjs>,
    required: true
  },
  minDate: {
    type: Object as PropType<Dayjs | null>
  },
  maxDate: {
    type: Object as PropType<Dayjs | null>
  },
  parsedValue: {
    type: [Object, Array] as PropType<Dayjs | Dayjs[]>
  },
  rangeState: {
    type: Object as PropType<RangeState>,
    default: () => ({
      endDate: null,
      selecting: false
    })
  }
}

export const panelSharedProps = {
  type: {
    type: String as PropType<DatePickType>,
    required: true
  }
}

export const panelRangeSharedProps = {
  unlinkPanels: Boolean,
  parsedValue: {
    type: Array as PropType<Dayjs[]>
  }
}

type SelectionMode = typeof selectionModes[number]
export const selectionModeWithDefault = <T extends SelectionMode>(mode: T) => {
  return {
    type: String as PropType<SelectionMode>,
    default: mode
  }
}

export const rangePickerSharedEmits = {
  pick: (range: [Dayjs, Dayjs]) => isArray(range)
}

export type RangePickerSharedEmits = typeof rangePickerSharedEmits
export type PanelRangeSharedProps = ExtractPropTypes<
  typeof panelRangeSharedProps
>
