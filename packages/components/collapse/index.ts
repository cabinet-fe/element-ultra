import { withInstall, withNoopInstall } from '@element-ultra/utils'

import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const ElCollapse = withInstall(Collapse, {
  CollapseItem,
})
export default ElCollapse
export const ElCollapseItem = withNoopInstall(CollapseItem)
