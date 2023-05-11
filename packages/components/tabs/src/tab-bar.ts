import type { TabsPaneContext } from 'tokens'
import type { ExtractPropTypes, PropType } from 'vue'

export const tabBar = {
  tabs: {
    type: Array as PropType<TabsPaneContext[]>,
    default: () => []
  }
}

export type TabBar = ExtractPropTypes<typeof tabBar>
