import { iconPropType } from 'utils'
import type { ExtractPropTypes } from 'vue'
import type Breadcrumb from './breadcrumb.vue'

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/'
  },
  separatorIcon: {
    type: iconPropType,
    default: ''
  }
}
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>
