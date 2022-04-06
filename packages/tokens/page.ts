import type { InjectionKey } from 'vue'

export interface PageContext {
  observer: IntersectionObserver
}

export const pageContextKey: InjectionKey<PageContext> = Symbol()
