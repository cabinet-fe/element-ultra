import { inject } from 'vue'
import { formKey, formItemKey } from '@element-ultra/tokens'

export const useFormItem = () => {
  const form = inject(formKey, undefined)
  const formItem = inject(formItemKey, undefined)
  return {
    form,
    formItem,
  }
}
