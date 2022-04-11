import type { ComponentSize } from '@element-ultra/constants'
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const actionProps = {
  needConfirm: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  },
  icon: {
    type: Object as PropType<Component>
  },
  isDrop: {
    type: Boolean,
    default: false
  }
} as const

export const actionGroupProps = {
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  },
  max: {
    type: Number,
    default: 3
  }
} as const

export type ActionProps = ExtractPropTypes<typeof actionProps>

export type ActionGroupProps = ExtractPropTypes<typeof actionGroupProps>
