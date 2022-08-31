import type { InjectionKey } from 'vue'
import type {
  FormProps,
  FormRules
} from '@element-ultra/components/form/src/form'

export interface FormContext {
  /** 表单根属性 */
  props: FormProps
  /** 表单规则 */
  formRules: FormRules
  emit: (evt: 'validate', ...args: any[]) => void
  resetField: (field: string) => void
  validateField: (field: string) => Promise<string | null>
}

export interface FormItemContext {
  validate(): Promise<boolean | null>
  reset(): void
  clearValidate(): void
}

export interface FormExposed {
  validate: (fields?: string | string[]) => Promise<boolean>
  resetFields: () => void
  clearValidate: (fields?: string | string[]) => void
}

export interface FormInjection {
  addForm(form: FormExposed): void
  deleteForm(form: FormExposed): void
}

export const formKey: InjectionKey<FormContext> = Symbol('elForm')
export const formItemKey: InjectionKey<FormItemContext> = Symbol('elFormItem')
export const injectedKey: InjectionKey<boolean> = Symbol('injected')
export const formInjectionKey: InjectionKey<FormInjection> = Symbol(
  'formDialogContextKey'
)
