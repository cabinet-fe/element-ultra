import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { CheckboxGroupProps } from './checkbox-group'

export const checkboxGroupInjectionKey: InjectionKey<{
  isGroup: boolean
  groupProps: CheckboxGroupProps
  groupCheckedSet: Ref<Set<string | number>>
  groupDisabled: ComputedRef<boolean | undefined>
  handleItemChange: (checked: boolean, value: string | number, label: string | number) => void
}> = Symbol('checkboxGroup')
