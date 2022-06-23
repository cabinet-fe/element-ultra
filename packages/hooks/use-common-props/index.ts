import { unref, inject, computed, type Ref } from 'vue'
import { formKey } from '@element-ultra/tokens'
import { useProp } from '../use-prop'
import type { ComponentSize } from '@element-ultra/constants'
import type { MaybeRef } from '@vueuse/core'
import { useConfig } from '../use-config'

/**
 * 获取组件大小
 * @param props 组件属性, 一个有size属性的props, 优先使用props
 * @param fallback 第二优先的属性
 * @param ignore 忽略的size来源
 * @returns 组件的size
 */
interface SizeOption {
  props: { size?: ComponentSize; [key: string]: any }
  fallback?: Ref<ComponentSize | undefined>
  ignore?: Array<'form' | 'global'>
}
export const useSize = (option: SizeOption): Ref<ComponentSize> => {
  const { props, fallback, ignore } = option
  const globalConfig = ignore?.includes('global') ? undefined : useConfig()[0]
  const form = ignore?.includes('form') ? undefined : inject(formKey, undefined)

  // 优先使用prop
  return computed(() => {
    return (
      props.size ||
      fallback?.value ||
      form?.props.size ||
      globalConfig?.size ||
      'default'
    )
  })
}

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formKey, undefined)
  return computed(
    () => disabled.value || unref(fallback) || form?.props.disabled || false
  )
}
