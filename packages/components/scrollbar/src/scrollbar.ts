import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export type BarX = {
  width: number
  left: number
}

export type BarY = {
  height: number
  top: number
}

export type WrapperState = {
  offsetWidth: number
  scrollWidth: number
  scrollLeft: number

  offsetHeight: number
  scrollHeight: number
  scrollTop: number
}

export type BarState = {
  barX: BarX
  barY: BarY
  visible: {
    barX: boolean
    barY: boolean
  }
  wrapState: WrapperState
}

export const scrollbarProps = {
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  viewClass: {
    type: [String, Array],
    default: ''
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ''
  },
  tag: {
    type: String,
    default: 'div'
  }
}
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export type ScrollCtx = {
  scrollTop: number
  scrollLeft: number
  scrollHeight: number
  scrollWidth: number
}

export const scrollbarEmits = {
  scroll: (ctx: ScrollCtx) => true,
}

export type ScrollbarEmits = typeof scrollbarEmits
