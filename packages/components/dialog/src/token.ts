import type { ComputedRef, CSSProperties, InjectionKey, Ref, Slots } from 'vue'
import type { useNamespace } from '@element-ultra/hooks'
import type { DialogProps } from './dialog'

export type DialogContext = {
  dialogRef: Ref<HTMLElement | null>
  headerRef: Ref<HTMLElement | null>
  ns: ReturnType<typeof useNamespace>
  rendered: Ref<boolean>
  style: ComputedRef<CSSProperties>
  slots: Slots
  rootProps: DialogProps
}

export const dialogInjectionKey: InjectionKey<DialogContext> = Symbol(
  'elDialogInjectionKey'
)
