import type { ComponentSize } from '@element-ultra/shared'
import type { Component, ExtractPropTypes, PropType } from 'vue'
import type { ButtonType } from '@element-ultra/components/button'

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
  },

  type: {
    type: String as PropType<ButtonType>,
    default: 'primary'
  }
} as const

export type ActionProps = ExtractPropTypes<typeof actionProps>

export type ActionGroupProps = ExtractPropTypes<typeof actionGroupProps>
