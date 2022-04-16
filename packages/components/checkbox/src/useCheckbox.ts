import { useFormItem } from '@element-ultra/hooks'
import { computed, inject, shallowRef } from 'vue'
import type { CheckboxEmit, CheckboxProps } from './checkbox'
import { checkboxGroupInjectionKey } from './token'

export const useCheckbox = (props: CheckboxProps, emit: CheckboxEmit) => {
  const { isGroup, groupProps, groupCheckedSet, handleItemChange } =
    inject(checkboxGroupInjectionKey, undefined) || {}
  const { form, formItem } = useFormItem(!isGroup)

  const isDisabled = computed(() => {
    return props.disabled || form?.props.disabled
  })

  const isChecked = computed(() => {
    // 首先最优先级的时checked属性， 其次时modelValue值
    return (
      props.checked ||
      props.trueValue === props.modelValue ||
      (props.value !== undefined && groupCheckedSet?.value.has(props.value))
    )
  })
  const checkboxSize = computed(() => {
    return props.size || groupProps?.size || form?.props.size || 'default'
  })

  let focus = shallowRef(false)

  const labelRef = shallowRef<HTMLLabelElement>()

  /**
   * 复选框状态改变
   * @param e
   */
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const modelValue = target.checked ? props.trueValue : props.falseValue
    const label = labelRef.value?.innerText ?? props.value ?? ''

    emit('update:modelValue', modelValue)
    emit('change', target.checked)
    formItem?.validate()

    if (handleItemChange && props.value !== undefined) {
      handleItemChange(target.checked, props.value, label)
    }
  }

  return {
    isDisabled,
    isChecked,
    checkboxSize,
    focus,
    labelRef,
    handleChange
  }
}
