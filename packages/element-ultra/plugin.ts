import { ElInfiniteScroll } from '@element-ultra/components/infinite-scroll'
import { ElLoading } from '@element-ultra/components/loading'
import { ElMessage } from '@element-ultra/components/message'
import { ElMessageBox } from '@element-ultra/components/message-box'
import { ElNotification } from '@element-ultra/components/notification'
import { ElPopoverDirective } from '@element-ultra/components/popover'

import type { Plugin } from 'vue'

export default [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopoverDirective,
] as Plugin[]
