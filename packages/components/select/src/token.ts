import type { OptionProps, SelectProps } from './defaults'
import type { ExtractPropTypes, InjectionKey } from 'vue'
import type { Option } from './select.types'

export interface SelectContext {
  props: ExtractPropTypes<typeof SelectProps>
  expanded: boolean
  onSelect: (option: Option<any>, index: number, byClick?: boolean) => void
  onKeyboardNavigate: (direction: 'forward' | 'backward') => void
  onKeyboardSelect: () => void
}

export const selectInjectionKey: InjectionKey<SelectContext> = Symbol()

export type IOptionProps = ExtractPropTypes<typeof OptionProps>

export type ISelectProps = ExtractPropTypes<typeof SelectProps>
