import type { useNamespace } from "@element-ultra/hooks"
import type { InjectionKey, ShallowRef, Slots } from "vue"
import type { ProTableProps } from './pro-table'

export const proTableKey: InjectionKey<{
  proTableSlots: Readonly<Slots>
  rootProps: ProTableProps
  ns: ReturnType<typeof useNamespace>
  setAutoQuery: (autoQuery: boolean) => void
  fetchData: (resetPage?: boolean) => Promise<void>
  loading: ShallowRef<boolean>
}> = Symbol('proTableKey')