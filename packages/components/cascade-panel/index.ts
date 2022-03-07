import CascadePanel from './src/index.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@element-ultra/utils'

CascadePanel.install = (app: App): void => {
  app.component(CascadePanel.name, CascadePanel)
}

const _CascadePanel = CascadePanel as SFCWithInstall<typeof CascadePanel>

export default _CascadePanel
export const ElCascadePanel = _CascadePanel
export * from './src/types'
export * from './src/config'
