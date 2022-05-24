import { iconPropType, buildProps } from '@element-ultra/utils'

export const dialogContentProps = buildProps({
  center: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: iconPropType,
    default: ''
  },
  draggable: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
} as const)
