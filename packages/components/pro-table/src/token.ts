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
}> = Symbol('proTableKey')

export const proTableContextKey: InjectionKey<{
  state: ShallowReactive<{
    total: number
    data: any[]
    selection: any[]
  }>;
  props: ProTableProps;
  fetchData: (resetPage?: boolean) => Promise<void>
  getQueryParams: () => {
    api: string
    query: Record<string, any>
  }
  find: () => any[],
  deleteRow: (index: number) => void,
  getColumns: () => ProTableColumn[]
}> = Symbol('proTableContextKey')
