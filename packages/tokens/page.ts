import type { InjectionKey } from 'vue'
import type { FormExposed } from './form'

export interface PageContext {
  observer: IntersectionObserver
}

export const pageContextKey: InjectionKey<PageContext> =
  Symbol('pageContextKey')
