import {
  usePopperTriggerProps,
  usePopperContentProps
} from 'components/popper'
import {
  useDelayedToggleProps,
  POPPER_CONTAINER_SELECTOR
} from 'hooks'

import type { ExtractPropTypes, PropType } from 'vue'

const triggers = ['hover', 'focus', 'click', 'contextmenu'] as const

export type Trigger = typeof triggers[number]

export const useTooltipContentProps = {
  ...useDelayedToggleProps,
  ...usePopperContentProps,
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: POPPER_CONTAINER_SELECTOR
  },
  content: {
    type: String,
    default: ''
  },
  rawContent: {
    type: Boolean,
    default: false
  },
  persistent: Boolean,
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  visible: {
    type: Boolean as PropType<boolean | null>,
    default: null
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean
  }
} as const

export const useTooltipTriggerProps = {
  ...usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: [String, Array] as PropType<Trigger | Trigger[]>,
    default: 'hover'
  }
} as const

export const useTooltipProps = {
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: undefined
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: true
  }
}

export type ElTooltipContentProps = ExtractPropTypes<
  typeof useTooltipContentProps
>

export type ElTooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>

export type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps> &
  ElTooltipContentProps &
  ElTooltipTriggerProps

