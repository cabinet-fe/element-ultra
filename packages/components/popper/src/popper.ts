import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { Placement, Options } from '@popperjs/core'

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark'
}

export type PopperEffect = typeof effects[number]
export type PopperTrigger = typeof triggers[number]
export type Measurable = {
  getBoundingClientRect: () => DOMRect
}

type ClassObjectType = Record<string, any>
type ClassType = string | ClassObjectType | ClassType[]

export const usePopperArrowProps = {
  arrowOffset: {
    type: Number,
    default: 5
  }
}

export const usePopperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: Array as PropType<Placement[]>,
    default: () => []
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({})
  },
  strategy: {
    type: String as PropType<'fixed' | 'absolute'>,

    default: 'absolute'
  }
}

export const usePopperProps = {
  autoClose: {
    type: Number,
    default: 0
  },
  cutoff: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean
  }
}

export const usePopperContentProps = {
  ...usePopperCoreConfigProps,
  style: { type: [String, Array, Object] as PropType<StyleValue> },
  className: { type: [String, Array, Object] as PropType<ClassType> },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark'
  },
  enterable: {
    type: Boolean,
    default: true
  },
  pure: {
    type: Boolean
  },
  popperClass: {
    type: [String, Array, Object] as PropType<ClassType>
  },
  popperStyle: {
    type: [String, Array, Object] as PropType<StyleValue>
  },
  referenceEl: {
    type: Object as PropType<HTMLElement>
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  zIndex: Number
} as const

export const usePopperTriggerProps = {
  virtualRef: {
    type: Object as PropType<Measurable>
  },
  virtualTriggering: {
    type: Boolean
  }
} as const

export type UsePopperProps = ExtractPropTypes<typeof usePopperProps>
export type UsePopperCoreConfigProps = ExtractPropTypes<
  typeof usePopperCoreConfigProps
>
