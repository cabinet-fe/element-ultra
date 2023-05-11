import { dialogProps, dialogEmits } from 'components/dialog'
import type { ExtractPropTypes, PropType } from 'vue'

export const drawerProps = {
  ...dialogProps,
  direction: {
    type: String as PropType<'ltr' | 'rtl' | 'ttb' | 'btt'>,

    default: 'rtl'
  },
  size: {
    type: [String, Number],
    default: '30%'
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalFade: {
    type: Boolean,
    default: true
  }
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

export const drawerEmits = dialogEmits
