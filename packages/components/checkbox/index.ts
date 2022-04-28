import { withInstall, withNoopInstall } from '@element-ultra/utils'

import Checkbox from './src/checkbox.vue'
import CheckboxButton from './src/checkbox-button.vue'
import CheckboxGroup from './src/checkbox-group.vue'
import CheckboxGroups from './src/checkbox-groups.vue'

export const ElCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup,
  CheckboxGroups
})
export default ElCheckbox

export const ElCheckboxButton = withNoopInstall(CheckboxButton)
export const ElCheckboxGroup = withNoopInstall(CheckboxGroup)
export const ElCheckboxGroups = withNoopInstall(CheckboxGroups)
