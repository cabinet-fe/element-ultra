import { panelRangeSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'

export const panelMonthRangeProps = {
  ...panelRangeSharedProps
}

export const panelMonthRangeEmits = ['pick', 'set-picker-option']

export type PanelMonthRangeProps = ExtractPropTypes<typeof panelMonthRangeProps>
