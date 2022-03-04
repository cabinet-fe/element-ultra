import { ElInfiniteScroll } from '@element-pro/components/infinite-scroll'
import { ElLoading } from '@element-pro/components/loading'
import { ElMessage } from '@element-pro/components/message'
import { ElMessageBox } from '@element-pro/components/message-box'
import { ElNotification } from '@element-pro/components/notification'
import { ElPopoverDirective } from '@element-pro/components/popover'

import type { Plugin } from 'vue'

export default [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopoverDirective,
] as Plugin[]
