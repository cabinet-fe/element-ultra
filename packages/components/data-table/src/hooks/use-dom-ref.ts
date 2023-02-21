import { shallowRef, provide, inject, InjectionKey, type ShallowRef } from 'vue'

export interface DomRefs {
  headerRef: ShallowRef<HTMLDivElement | undefined>
  footerRef: ShallowRef<HTMLDivElement | undefined>
}

const KEY: InjectionKey<DomRefs> = Symbol()

export function useDomRefProvide() {
  /** 表头dom引用 */
  const headerRef = shallowRef<HTMLDivElement>()

  /** 表尾dom引用 */
  const footerRef = shallowRef<HTMLDivElement>()

  const provided = {
    headerRef,
    footerRef
  }

  provide(KEY, provided)

  return provided
}

export function useDomRefInject() {
  return inject(KEY)!
}
