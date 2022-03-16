import { buildProps, definePropType } from '@element-ultra/utils'
import type { ExtractPropTypes } from 'vue'

export type FormDialogConfirmFn = () => Promise<any> | any

export const formDialogProps = buildProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
  },

  confirm: {
    type: definePropType<FormDialogConfirmFn>(Function)
  }
} as const)

export type FormDialogProps = ExtractPropTypes<typeof formDialogProps>
