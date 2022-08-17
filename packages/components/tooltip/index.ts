import { withInstall } from '@element-ultra/utils'
import Tooltip from './src/tooltip.vue'

export const ElTooltip = withInstall(Tooltip)
export * from './src/tooltip'
export * from './src/tokens'
export type TooltipInstance = InstanceType<typeof Tooltip>

export default ElTooltip
