import type { InjectionKey } from 'vue'
import type { BreadcrumbProps } from '@element-ultra/components/breadcrumb'

export const elBreadcrumbKey: InjectionKey<BreadcrumbProps> =
  Symbol('elBreadcrumbKey')
