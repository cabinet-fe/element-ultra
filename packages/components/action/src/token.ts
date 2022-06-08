import type { InjectionKey, ShallowRef } from 'vue'

export const actionGroupToken: InjectionKey<{
  dropdownRef?: ShallowRef<any>
  setConfirmVisible: (visible: boolean) => void
}> = Symbol('actionGroupToken')
