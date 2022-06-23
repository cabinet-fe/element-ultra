import { UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import { dialogContentProps } from './dialog-content'

import type { ExtractPropTypes, PropType } from 'vue'

export const dialogProps = {
  ...dialogContentProps,
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function as PropType<(...args: any[]) => void>
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  modalClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  }
}

export const dialogContentEmits = {
  close: () => true
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => typeof value === 'boolean',
  openAutoFocus: () => true,
  closeAutoFocus: () => true
}
export type DialogEmits = typeof dialogEmits
