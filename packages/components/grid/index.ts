import { withInstall, withNoopInstall } from 'utils'
import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export const ElGrid = withInstall(Grid, {
  GridItem
})

export const ElGridItem = withNoopInstall(GridItem)
export default ElGrid

export * from './src/grid'
