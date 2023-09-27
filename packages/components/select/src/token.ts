import type { OptionProps, SelectProps } from './defaults'
import type { ExtractPropTypes, InjectionKey, Ref, ComputedRef } from 'vue'

export interface SelectContext {
  props: ExtractPropTypes<typeof SelectProps>
  expanded: Ref<boolean>
  states: Record<string, any>
  filteredOptions: ComputedRef<any[]>
  handleSelect: (option: any, index: number, byClick?: boolean) => void
  onKeyboardNavigate: (direction: 'forward' | 'backward') => void
  onKeyboardSelect: () => void
  onHover: (idx: number) => void
  getLabel: (item: any) => string | number
  getValue: (item: any) => string | number
  update: (
    val: (string | number)[],
    label: string[],
    option: Record<string, any>[]
  ) => void
}

export const selectInjectionKey: InjectionKey<SelectContext> = Symbol()

export type IOptionProps = ExtractPropTypes<typeof OptionProps>

export type ISelectProps = ExtractPropTypes<typeof SelectProps>
