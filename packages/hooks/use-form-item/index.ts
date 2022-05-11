import { inject } from 'vue'
import { formKey, formItemKey } from '@element-ultra/tokens'

/**
 * 注入formItem和form
 * @param injectIt 是否注入默认true
 * @returns
 */
export const useFormItem = (injectIt = true) => {
  return {
    form: injectIt ? inject(formKey, undefined) : undefined,
    formItem: injectIt ?  inject(formItemKey, undefined) : undefined
  }
}
