import { panelRangeSharedProps, panelSharedProps } from './shared'

import type { ExtractPropTypes } from 'vue'

export const panelDateRangeProps = {
  ...panelSharedProps,
  ...panelRangeSharedProps
}

export type PanelDateRangeProps = ExtractPropTypes<typeof panelDateRangeProps>
