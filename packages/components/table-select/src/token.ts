import type { InjectionKey, Ref, Slots } from 'vue'
import type { TableSelectProps } from './table-select'

export const tableSelectKey: InjectionKey<{
  /** 根组件属性 */
  rootProps: TableSelectProps,
  /** 插槽 */
  slots: Slots,
  /** 组件尺寸 */
  size:  Ref<"small" | "default" | "large">
}> = Symbol('tableSelectKey')


