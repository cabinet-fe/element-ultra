import { ref, computed, inject, getCurrentInstance, watch } from 'vue'
import { toTypeString } from '@vue/shared'
import { FORM_COMPONENT_PROPS, UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import { formKey, formItemKey } from '@element-ultra/tokens'

import { useSize } from '@element-ultra/hooks'
import type { ExtractPropTypes } from 'vue'
import type { ICheckboxGroupInstance } from './checkbox.type'

export const useCheckboxProps = {
  ...FORM_COMPONENT_PROPS,
  modelValue: {
    type: [Boolean, Number, String],
    default: () => undefined,
  },
  value: {
    type: [String, Boolean, Number, Object],
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: undefined,
  },
  trueLabel: {
    type: [String, Number],
    default: undefined,
  },
  falseLabel: {
    type: [String, Number],
    default: undefined,
  },
  tabindex: [String, Number],
  size: String,
}

export type IUseCheckboxProps = ExtractPropTypes<typeof useCheckboxProps>

export const useCheckboxGroup = () => {
  const elForm = inject(formKey, undefined)
  const elFormItem = inject(formItemKey, undefined)
  const checkboxGroup = inject<ICheckboxGroupInstance>('CheckboxGroup', {})
  const isGroup = computed(
    () => checkboxGroup && checkboxGroup?.name === 'ElCheckboxGroup'
  )

  return {
    isGroup,
    checkboxGroup,
    elForm,
    elFormItem,
  }
}

const useModel = (props: IUseCheckboxProps) => {
  const selfModel = ref(false)
  const { emit } = getCurrentInstance()!
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const isLimitExceeded = ref(false)
  const model = computed({
    get() {
      return isGroup.value
        ? checkboxGroup.modelValue?.value
        : props.modelValue ?? selfModel.value
    },

    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value =
          checkboxGroup.max !== undefined &&
          val.length > checkboxGroup.max.value
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel.value = val as boolean
      }
    },
  })

  return {
    model,
    isLimitExceeded,
  }
}

const useCheckboxStatus = (
  props: IUseCheckboxProps,
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const focus = ref(false)
  const size = useSize(checkboxGroup?.checkboxGroupSize, { prop: true })
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (toTypeString(value) === '[object Boolean]') {
      return value
    } else if (Array.isArray(value)) {
      return value.includes(props.value)
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  const checkboxSize = useSize(
    computed(() =>
      isGroup.value ? checkboxGroup?.checkboxGroupSize?.value : undefined
    )
  )

  return {
    isChecked,
    focus,
    size,
    checkboxSize,
  }
}

const useDisabled = (
  props: IUseCheckboxProps,
  {
    model,
    isChecked,
  }: Partial<ReturnType<typeof useModel>> &
    Partial<ReturnType<typeof useCheckboxStatus>>
) => {
  const { elForm, isGroup, checkboxGroup } = useCheckboxGroup()
  const isLimitDisabled = computed(() => {
    const max = checkboxGroup.max?.value
    const min = checkboxGroup.min?.value
    return (
      (!!(max || min) && model?.value.length >= max! && !isChecked?.value) ||
      (model?.value.length <= min! && isChecked?.value)
    )
  })
  const isDisabled = computed(() => {
    const disabled = props.disabled || elForm?.props?.disabled
    return (
      (isGroup.value
        ? checkboxGroup.disabled?.value || disabled || isLimitDisabled.value
        : props.disabled || elForm?.props?.disabled) ?? false
    )
  })

  return {
    isDisabled,
    isLimitDisabled,
  }
}

const setStoreValue = (
  props: IUseCheckboxProps,
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  function addToStore() {
    if (!model) return
    if (Array.isArray(model.value) && !model.value.includes(props.value)) {
      model.value.push(props.value)
    } else {
      model.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

const useEvent = (
  props: IUseCheckboxProps,
  { isLimitExceeded }: Partial<ReturnType<typeof useModel>>
) => {
  const { elFormItem } = useCheckboxGroup()
  const { emit } = getCurrentInstance()
  function handleChange(e: InputEvent) {
    if (isLimitExceeded.value) return
    const target = e.target as HTMLInputElement
    const value = target.checked
      ? props.trueLabel ?? true
      : props.falseLabel ?? false

    emit('change', value, e)
  }

  watch(
    () => props.modelValue,
    () => {
      elFormItem?.validate()
    }
  )

  return {
    handleChange,
  }
}

export const useCheckbox = (props: IUseCheckboxProps) => {
  const { model, isLimitExceeded } = useModel(props)
  const { focus, size, isChecked, checkboxSize } = useCheckboxStatus(props, {
    model,
  })
  const { isDisabled } = useDisabled(props, { model, isChecked })
  const { handleChange } = useEvent(props, { isLimitExceeded })

  setStoreValue(props, { model })

  return {
    isChecked,
    isDisabled,
    checkboxSize,
    model,
    handleChange,
    focus,
    size,
  }
}
