import type { InjectionKey } from 'vue'
import type { BreadcrumbProps } from 'components/breadcrumb'

export const elBreadcrumbKey: InjectionKey<BreadcrumbProps> =
  Symbol('elBreadcrumbKey')
