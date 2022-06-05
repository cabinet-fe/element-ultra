import type { InjectionKey } from 'vue'
import type { TableSelectEmits, TableSelectProps } from './table-select'

export const multipleKey: InjectionKey<boolean> = Symbol('multiple')
export const showIndexKey: InjectionKey<boolean> = Symbol('showIndex')
export const stripeKey: InjectionKey<boolean> = Symbol('stripe')
export const paginationKey: InjectionKey<boolean> = Symbol('pagination')
export const valueKeyKey: InjectionKey<String> = Symbol('valueKey')

export const tableSelectKey: InjectionKey<{
  rootProps: TableSelectProps,
  rootEmit: TableSelectEmits
}> = Symbol('tableSelectKey')


