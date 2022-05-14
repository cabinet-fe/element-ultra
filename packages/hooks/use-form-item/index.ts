import { computed, inject } from 'vue'
import { formKey, formItemKey } from '@element-ultra/tokens'

/**
 * 注入formItem和form
 * @param injectIt 是否注入,默认true
 * @returns
 */
export const useFormItem = (injectIt = true) => {
  const form = injectIt ? inject(formKey, undefined) : undefined
  const formDisabled = computed(() => form?.props.disabled || false)
  const formSize = computed(() => form?.props.size)
  return {
    form: injectIt ? inject(formKey, undefined) : undefined,
    formItem: injectIt ? inject(formItemKey, undefined) : undefined,
    formDisabled,
    formSize
  }
}
