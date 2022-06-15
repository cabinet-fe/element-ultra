import type { InjectionKey, Slots } from 'vue'
import type { TableSelectProps } from './table-select'

export const tableSelectKey: InjectionKey<{
  rootProps: TableSelectProps,
  slots: Slots
}> = Symbol('tableSelectKey')


