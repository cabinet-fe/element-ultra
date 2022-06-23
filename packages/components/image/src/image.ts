import { isNumber } from '@element-ultra/utils'

import type { ExtractPropTypes, PropType } from 'vue'

export const imageProps = {
  appendToBody: {
    type: Boolean,
    default: undefined
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ''
  },
  fit: {
    type: String as PropType<
      '' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    >,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: false
  },
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | undefined>
  },
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  previewTeleported: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  }
}
export type ImageProps = ExtractPropTypes<typeof imageProps>

export const imageEmits = {
  error: (evt: Event) => evt instanceof Event,
  switch: (val: number) => isNumber(val),
  close: () => true
}
export type ImageEmits = typeof imageEmits
