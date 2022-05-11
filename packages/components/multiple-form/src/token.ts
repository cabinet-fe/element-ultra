import type { useNamespace } from "@element-ultra/hooks"
import type { ComputedRef, InjectionKey, Slots } from "vue"
import type { MultipleFormColumn, MultipleFormProps } from "./multiple-form"

export const multipleFormKey: InjectionKey<{
  multipleFormProps: MultipleFormProps
  ns: ReturnType<typeof useNamespace>
  slots: Readonly<Slots>
  visibleColumns: ComputedRef<MultipleFormColumn[]>
}> = Symbol("multipleFormKey")