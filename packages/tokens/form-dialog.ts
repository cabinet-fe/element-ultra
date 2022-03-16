import type { InjectionKey } from 'vue'

export interface FormDialogContext {
  addForm(form: any): void
  deleteForm(form: any): void
}

export const formDialogContextKey: InjectionKey<FormDialogContext> = Symbol(
  'formDialogContextKey'
)
