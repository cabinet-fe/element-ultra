import type { OptionProps, SelectProps } from './defaults'
import type { ExtractPropTypes, InjectionKey } from 'vue'

export interface SelectContext {
  props: ExtractPropTypes<typeof SelectProps>
  expanded: boolean
  onSelect: (option: any, index: number, byClick?: boolean) => void
  onKeyboardNavigate: (direction: 'forward' | 'backward') => void
  onKeyboardSelect: () => void
  getLabel: (item: any) => string | number
  getValue: (item: any) => string | number
}

export const selectInjectionKey: InjectionKey<SelectContext> = Symbol()

export type IOptionProps = ExtractPropTypes<typeof OptionProps>

export type ISelectProps = ExtractPropTypes<typeof SelectProps>
