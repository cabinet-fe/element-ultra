import { inject } from 'vue'
import { elFormKey, elFormItemKey } from '@element-pro/tokens'

export const useFormItem = () => {
  const form = inject(elFormKey, undefined)
  const formItem = inject(elFormItemKey, undefined)
  return {
    form,
    formItem,
  }
}
