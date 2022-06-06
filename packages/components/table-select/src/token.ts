import type { InjectionKey } from 'vue'
import type { TableSelectProps } from './table-select'

export const tableSelectKey: InjectionKey<{
  rootProps: TableSelectProps
}> = Symbol('tableSelectKey')


