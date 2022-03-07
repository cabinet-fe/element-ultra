import Cascade from './src/index.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@element-ultra/utils'

Cascade.install = (app: App): void => {
  app.component(Cascade.name, Cascade)
}

const _Cascade = Cascade as SFCWithInstall<typeof Cascade>

export default _Cascade
export const ElCascade = _Cascade
