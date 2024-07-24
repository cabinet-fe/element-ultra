import type { UseNamespaceReturn } from '@element-ultra/element-ultra'
import type { InjectionKey, Slots } from 'vue'
import type { TableSelectEmits, TableSelectProps } from './table-select'

export const tableSelectToken: InjectionKey<{
  /** 根组件属性 */
  rootProps: TableSelectProps
  /** 根组件触发事件 */
  rootEmit: TableSelectEmits
  /** 类命名空间 */
  ns: UseNamespaceReturn
  rootSlots: Slots
}> = Symbol('tableSelectToken')
