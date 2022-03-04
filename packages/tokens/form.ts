import type { InjectionKey, Ref } from 'vue'
import type { ValidateFieldsError } from 'async-validator'
import type { ComponentSize } from '@element-pro/constants'
import type {
  ElFormProps,
  ElFormRules,
} from '@element-pro/components/form/src/form'

export interface ElFormContext {
  props: ElFormProps

  formRules: Ref<ElFormRules>
  emit: (evt: 'validate', ...args: any[]) => void
  addFormItem: (field: string, formItem: ElFormItemContext) => void
  deleteFormItem: (field: string) => void
  resetField: (field: string) => void
  validateField: (field: string) => Promise<string | null>
}

export interface ValidateFieldCallback {
  (isValid?: string, invalidFields?: ValidateFieldsError): void
}

export interface ElFormItemContext {
  validate(): Promise<boolean | null>
  reset(): void
  clearValidate(): void
}

export const elFormKey: InjectionKey<ElFormContext> = Symbol('elForm')
export const elFormItemKey: InjectionKey<ElFormItemContext> =
  Symbol('elFormItem')
