import type { useNamespace } from "@element-ultra/hooks"
import type { InjectionKey, Slots } from "vue"
import type { ProTableProps } from './pro-table'

export const proTableKey: InjectionKey<{
  proTableSlots: Readonly<Slots>
  rootProps: ProTableProps
  ns: ReturnType<typeof useNamespace>
}> = Symbol('proTableKey')