import type { InjectionKey } from 'vue'

export const multipleKey: InjectionKey<boolean> = Symbol('multiple')
export const showIndexKey: InjectionKey<boolean> = Symbol('showIndex')
export const stripeKey: InjectionKey<boolean> = Symbol('stripe')
export const paginationKey: InjectionKey<boolean> = Symbol('pagination')
