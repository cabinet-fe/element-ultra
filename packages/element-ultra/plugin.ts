import { ElInfiniteScroll } from 'components/infinite-scroll'
import { ElLoading } from 'components/loading'
import { ElMessage } from 'components/message'
import { ElMessageBox } from 'components/message-box'
import { ElNotification } from 'components/notification'
import { ElPopoverDirective } from 'components/popover'

import type { Plugin } from 'vue'

export default [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopoverDirective,
] as Plugin[]
