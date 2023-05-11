import type { ButtonType } from 'components/button'
import { QuestionFilled } from 'icon-ultra'
import { useTooltipContentProps } from 'components/tooltip'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const popconfirmProps = {
  title: {
    type: String
  },
  content: {
    type: String
  },
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  confirmButtonType: {
    type: String as PropType<ButtonType>,
    default: 'primary'
  },
  cancelButtonType: {
    type: String as PropType<ButtonType>
  },
  icon: {
    type: [String, Function, Object] as PropType<string | Component>,
    default: QuestionFilled as Component
  },
  iconColor: {
    type: String,
    default: '#f90'
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  onConfirm: {
    type: Function as PropType<(e: Event) => Promise<void> | void>
  },
  onCancel: {
    type: Function as PropType<(e: Event) => Promise<void> | void>
  },
  teleported: useTooltipContentProps.teleported,
  persistent: useTooltipContentProps.persistent
} as const

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
