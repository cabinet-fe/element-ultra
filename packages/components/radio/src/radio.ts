import { ref, computed, inject, type PropType } from 'vue'
import {
  UPDATE_MODEL_EVENT,
  FORM_COMPONENT_PROPS,
  SizeProp
} from '@element-ultra/constants'
import { radioGroupKey } from '@element-ultra/tokens'
import { useDisabled, useSize } from '@element-ultra/hooks'

import type { ExtractPropTypes } from 'vue'
import type { EmitFn } from '@element-ultra/utils'

export const radioPropsBase = {
  ...FORM_COMPONENT_PROPS,

  size: SizeProp,

  disabled: {
    type: Boolean,
    default: undefined
  },
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  }
}

export const radioProps = {
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean
  }
} as const

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export const useRadio = (
  props: Pick<Partial<RadioProps>, 'value' | 'modelValue'>,
  emit: EmitFn<typeof radioEmits>
) => {
  const radioRef = ref<HTMLInputElement>()
  const radioGroup = inject(radioGroupKey, undefined)
  const isGroup = computed(() => !!radioGroup)

  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === props.value
    }
  })

  const size = useSize({
    props,
    fallback: computed(() => radioGroup?.size)
  })

  const disabled = useDisabled({
    props,
    fallback: computed(() => radioGroup?.disabled)
  })
  const focus = ref(false)

  const tabIndex = computed(() => {
    return disabled.value || (isGroup.value && modelValue.value !== props.value)
      ? -1
      : 0
  })

  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue
  }
}
