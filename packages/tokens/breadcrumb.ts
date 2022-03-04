import type { InjectionKey } from 'vue'
import type { BreadcrumbProps } from '@element-pro/components/breadcrumb'

export const elBreadcrumbKey: InjectionKey<BreadcrumbProps> =
  Symbol('elBreadcrumbKey')
