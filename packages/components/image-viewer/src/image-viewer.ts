import type { ExtractPropTypes, PropType } from 'vue'

export const imageViewerProps = {
  urlList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  teleported: {
    type: Boolean,
    default: false
  }
} as const
export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => typeof index === 'number'
}
export type ImageViewerEmits = typeof imageViewerEmits

export type ImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise'
