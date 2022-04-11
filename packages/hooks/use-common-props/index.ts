import { ref, unref, inject, computed, type PropType } from 'vue'
import {  formKey } from '@element-ultra/tokens'
import { useProp } from '../use-prop'
import type { ComponentSize } from '@element-ultra/constants'
import type { MaybeRef } from '@vueuse/core'
import { useConfig } from '../use-config'

export const useSizeProp = {
  type: String as PropType<'default' | 'small' | 'large'>,
  default: 'default'
}

export const useSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? undefined : useConfig()[0]
  const form = ignore.form ? undefined : inject(formKey, undefined)

  return computed(() => {
    return size.value ||
    unref(fallback) ||
    form?.props.size ||
    globalConfig?.size ||
    'default'
  })
}

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formKey, undefined)
  return computed(
    () => disabled.value || unref(fallback) || form?.props.disabled || false
  )
}
