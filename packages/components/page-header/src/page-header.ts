import { Back } from 'icon-ultra'
import type { ExtractPropTypes, PropType, Component } from 'vue'

export const pageHeaderProps = {
  icon: {
    type: [String, Object] as PropType<string | Component>,
    default: Back,
  },
  title: {
    type: String,
    default: '返回'
  },
  content: {
    type: String,
    default: '',
  },
} as const
export type PageHeaderProps = ExtractPropTypes<typeof pageHeaderProps>

export const pageHeaderEmits = {
  back: () => true,
}
export type PageHeaderEmits = typeof pageHeaderEmits
