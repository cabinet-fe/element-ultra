import { withInstall } from 'utils'
import Action from './src/action.vue'
import ActionGroup from './src/action-group.vue'

export const ElAction = withInstall(Action)
export const ElActionGroup = withInstall(ActionGroup)

export default Action

export * from './src/type'
