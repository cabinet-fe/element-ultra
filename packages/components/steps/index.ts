import { withInstall, withNoopInstall } from '@element-ultra/utils'

import Steps from './src/steps.vue'
import Step from './src/step.vue'

export const ElSteps = withInstall(Steps, {
  Step,
})
export default ElSteps
export const ElStep = withNoopInstall(Step)
