import type { useNamespace } from 'hooks'
import type {
  ComputedRef,
  InjectionKey,
  ShallowReactive,
  ShallowRef,
  Slots
} from 'vue'
import type {
  MultipleFormColumn,
  MultipleFormProps,
  MultipleFormRules
} from './type'

export const multipleFormKey: InjectionKey<{
  multipleFormProps: MultipleFormProps
  ns: ReturnType<typeof useNamespace>
  slots: Readonly<Slots>
  visibleColumns: ComputedRef<MultipleFormColumn[] | undefined>
  columnRules: ComputedRef<Record<string, Partial<MultipleFormRules>>>
  errorTip: ShallowReactive<Record<string, any>>
  handleCreate: (index: number) => void
  rows: ShallowRef<any[]>
}> = Symbol('multipleFormKey')
