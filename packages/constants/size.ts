import type { PropType } from "vue"

export const componentSizes = ['default', 'small', 'large'] as const
export type ComponentSize = typeof componentSizes[number]
export const SizeProp = {
  type: String as PropType<'default' | 'small' | 'large'>
}