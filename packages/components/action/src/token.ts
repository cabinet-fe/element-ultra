import type { InjectionKey, ShallowRef } from 'vue'
import type { ActionGroupProps } from './type'

export const actionGroupToken: InjectionKey<{
  groupProps: ActionGroupProps
  dropdownRef?: ShallowRef<any>
  setDropdownVisible: (visible: boolean) => void
}> = Symbol('actionGroupToken')
