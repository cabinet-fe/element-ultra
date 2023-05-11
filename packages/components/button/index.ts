import { withInstall, withNoopInstall } from 'utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const ElButton = withInstall(Button, {
  ButtonGroup,
})

export const ElButtonGroup = withNoopInstall(ButtonGroup)
export default ElButton

export * from './src/button'
