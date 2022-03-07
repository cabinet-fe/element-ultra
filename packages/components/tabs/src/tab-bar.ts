import { buildProps, definePropType, mutable } from '@element-ultra/utils'
import type { TabsPaneContext } from '@element-ultra/tokens'
import type { ExtractPropTypes } from 'vue'

export const tabBar = buildProps({
  tabs: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
} as const)

export type TabBar = ExtractPropTypes<typeof tabBar>
