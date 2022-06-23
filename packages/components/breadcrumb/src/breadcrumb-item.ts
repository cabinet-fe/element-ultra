import type { ExtractPropTypes, PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type BreadcrumbItem from './breadcrumb-item.vue'

export const breadcrumbItemProps = {
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: ''
  },
  replace: {
    type: Boolean,
    default: false
  }
}
export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
