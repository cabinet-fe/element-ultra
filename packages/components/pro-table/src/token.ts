import type { InjectionKey, Slots } from "vue"

export const proTableKey: InjectionKey<{
  proTableSlots: Readonly<Slots>
}> = Symbol('proTableKey')