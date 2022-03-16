import type { InjectionKey, Ref } from 'vue'
import type { ValidateFieldsError } from 'async-validator'
import type {
  FormProps,
  FormRules,
} from '@element-ultra/components/form/src/form'

export interface FormContext {
  props: FormProps

  formRules: FormRules
  emit: (evt: 'validate', ...args: any[]) => void
  addFormItem: (field: string, formItem: FormItemContext) => void
  deleteFormItem: (field: string) => void
  resetField: (field: string) => void
  validateField: (field: string) => Promise<string | null>
}

export interface ValidateFieldCallback {
  (isValid?: string, invalidFields?: ValidateFieldsError): void
}

export interface FormItemContext {
  validate(): Promise<boolean | null>
  reset(): void
  clearValidate(): void
}

export const formKey: InjectionKey<FormContext> = Symbol('elForm')
export const formItemKey: InjectionKey<FormItemContext> =
  Symbol('elFormItem')
