import type { useNamespace } from '@element-ultra/hooks'
import type { InjectionKey, ShallowReactive, ShallowRef, Slots } from 'vue'
import type { ProTableColumn, ProTableProps } from './pro-table'

export const proTableKey: InjectionKey<{
  proTableSlots: Readonly<Slots>
  rootProps: ProTableProps
  ns: ReturnType<typeof useNamespace>
  setAutoQuery: (autoQuery: boolean) => void
  fetchData: (resetPage?: boolean) => Promise<void>
  loading: ShallowRef<boolean>
  defaultQuery: { value: Record<string, any> }
}> = Symbol('proTableKey')

export const proTableContextKey: InjectionKey<{
  state: ShallowReactive<{
    total: number
    data: any[]
  }>;
  props: ProTableProps;
  fetchData: (resetPage?: boolean) => Promise<void>
  getQueryParams: () => {
    api: string
    query: Record<string, any>
    extra?: Record<string, any>
    sortKeys?: Record<string, 'default' | 'asc' | 'dsc'>
  }
  find: () => any[],
  deleteRow: (index: number) => void,
  getColumns: () => ProTableColumn[]
}> = Symbol('proTableContextKey')
