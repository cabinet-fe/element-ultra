import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Instance } from '@popperjs/core'
import type { Measurable } from './popper'

export type ElPopperInjectionContext = {
  triggerRef: ShallowRef<Measurable | undefined>
  contentRef: ShallowRef<HTMLElement | undefined>
  popperInstanceRef: ShallowRef<Instance | undefined>
}

export type ElPopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | null>
  arrowOffset: Ref<number | undefined>
}

export const POPPER_INJECTION_KEY: InjectionKey<ElPopperInjectionContext> =
  Symbol('elPopper')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<ElPopperContentInjectionContext> =
  Symbol('elPopperContent')
