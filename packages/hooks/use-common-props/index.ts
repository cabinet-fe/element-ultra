import { inject, computed, type Ref } from 'vue'
import { formKey } from '@element-ultra/tokens'
import type { ComponentSize } from '@element-ultra/constants'
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

/**
 * 获取组件大小
 * @param props 组件属性, 一个有size属性的props, 优先使用props
 * @param fallback 第二优先的属性
 * @param ignore 忽略的size来源
 * @returns 组件的size
 */
 interface DisabledOption {
  props: { disabled?: boolean; [key: string]: any }
  fallback?: Ref<boolean | undefined>
}

export const useDisabled = (options: DisabledOption) => {
  const { props, fallback } = options
  const form = inject(formKey, undefined)
  return computed(
    () => props.disabled ?? fallback?.value ?? form?.props.disabled ?? false
  )
}
