import type { useNamespace } from "@element-ultra/hooks"
import type { InjectionKey, Slots } from "vue"
import type { MultipleFormProps } from "./multiple-form"

export const multipleFormKey: InjectionKey<{
  multipleFormProps: MultipleFormProps
  ns: ReturnType<typeof useNamespace>
  slots: Readonly<Slots>
}> = Symbol("multipleFormKey")