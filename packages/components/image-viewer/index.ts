import { withInstall } from '@element-ultra/utils'

import ImageViewer from './src/image-viewer.vue'

export const ElImageViewer = withInstall(ImageViewer)
export default ElImageViewer

export * from './src/image-viewer'
