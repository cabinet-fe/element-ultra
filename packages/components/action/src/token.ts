import type { InjectionKey, ShallowRef } from 'vue'

export const actionGroupToken: InjectionKey<{
  dropdownRef?: ShallowRef<any>
  setDropdownVisible: (visible: boolean) => void
}> = Symbol('actionGroupToken')
