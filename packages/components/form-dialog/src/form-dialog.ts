import type { ExtractPropTypes, PropType } from 'vue'

export type FormDialogConfirmFn = () => Promise<any> | any

export const formDialogProps = {
  modelValue: {
    type: Boolean,
    default: false
  },

  title: {
    type: String
  },

  confirm: {
    type: Function as PropType<FormDialogConfirmFn>
  },

  continue: {
    type: Boolean,
    default: false
  },

  width: {
    type: String
  },

  hideConfirm: {
    type: Boolean
  }
} as const

export type FormDialogProps = ExtractPropTypes<typeof formDialogProps>
