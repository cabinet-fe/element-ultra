import type { ButtonTypes } from '@element-ultra/components/button'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useTooltipContentProps } from '@element-ultra/components/tooltip'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const popconfirmProps = {
  title: {
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
    type: String as PropType<ButtonTypes>,
    default: 'primary'
  },
  cancelButtonType: {
    type: String as PropType<ButtonTypes>
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
