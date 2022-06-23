import type SkeletonItem from './skeleton-item.vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const skeletonItemProps = {
  variant: {
    type: String as PropType<
      | 'circle'
      | 'rect'
      | 'h1'
      | 'h3'
      | 'text'
      | 'caption'
      | 'p'
      | 'image'
      | 'button'
    >,

    default: 'text'
  }
}
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>
