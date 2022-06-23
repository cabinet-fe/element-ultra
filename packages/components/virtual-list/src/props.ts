import { VERTICAL } from './defaults'

import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { ItemSize } from './types'

const itemSize = {
  type: [Number, Function] as PropType<number | ItemSize>,
  required: true
}

const estimatedItemSize = {
  type: Number
}

const cache = {
  type: Number,
  default: 2
}

const direction = {
  type: String as PropType<'ltr' | 'rtl'>,
  default: 'ltr'
}

const initScrollOffset = {
  type: Number,
  default: 0
}

const total = {
  type: Number,
  required: true
}

const layout = {
  type: String as PropType<'horizontal' | 'vertical'>,
  default: VERTICAL
}

export const virtualizedProps = {
  className: {
    type: String,
    default: ''
  },

  containerElement: {
    type: [String, Object] as PropType<string | Element>,
    default: 'div'
  },

  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },

  /**
   * @description controls the horizontal direction.
   */
  direction,

  height: {
    type: [String, Number],
    required: true
  },

  innerElement: {
    type: [String, Object],
    default: 'div'
  },

  style: {
    type: [Object, String, Array] as PropType<StyleValue>
  },

  useIsScrolling: {
    type: Boolean,
    default: false
  },

  width: {
    type: [Number, String],
    required: false
  },

  perfMode: {
    type: Boolean,
    default: true
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false
  }
}

export const virtualizedListProps = {
  /**
   * @description describes how many items should be pre rendered to the head
   * and the tail of the window
   */
  cache,

  estimatedItemSize,

  /**
   * @description controls the list's orientation
   */
  layout,

  initScrollOffset,

  /**
   * @description describes the total number of the list.
   */
  total,

  itemSize,
  ...virtualizedProps
}

export const virtualizedGridProps = {
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  rowCache: cache,
  rowHeight: itemSize,
  totalColumn: total,
  totalRow: total,
  ...virtualizedProps
}

export const virtualizedScrollbarProps = {
  layout,
  total,
  ratio: {
    type: Number,
    required: true
  },
  clientSize: {
    type: Number,
    required: true
  },
  scrollFrom: {
    type: Number,
    required: true
  },
  visible: Boolean
}

export type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>
export type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>
export type VirtualizedGridProps = ExtractPropTypes<typeof virtualizedGridProps>

export type VirtualizedScrollbarProps = ExtractPropTypes<
  typeof virtualizedScrollbarProps
>
