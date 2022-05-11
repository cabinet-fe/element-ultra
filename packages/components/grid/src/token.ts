import type { ComputedRef, InjectionKey } from 'vue'

export const gridInjectionKey: InjectionKey<{
  point: ComputedRef<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'>
}> = Symbol('grid')
