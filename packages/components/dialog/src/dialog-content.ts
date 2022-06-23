import { iconPropType } from '@element-ultra/utils'

export const dialogContentProps = {
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
}
