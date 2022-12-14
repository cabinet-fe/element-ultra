import type { useNamespace } from '@element-ultra/hooks'
import type { InjectionKey, ShallowReactive, ShallowRef, Slots } from 'vue'
import type { ProTableColumn, ProTableProps } from './pro-table'

export const proTableKey: InjectionKey<{
  /** 表格插槽 */
  proTableSlots: Readonly<Slots>
  /** 表格根组件属性 */
  rootProps: ProTableProps
  /** 组件命名空间 */
  ns: ReturnType<typeof useNamespace>
  /** 表格查询条件字符串 */
  currentQueryStr: { value: string }
  /** 设置是否能够自动发起请求 */
  setAutoQuery: (autoQuery: boolean) => void
  /** 请求数据 */
  fetchData: (resetPage?: boolean) => Promise<void>
  /** 加载状态 */
  loading: ShallowRef<boolean>
  /** 默认查询参数, 重置时使用 */
  defaultQuery: { value: Record<string, any> }
}> = Symbol('proTableKey')

export const proTableContextKey: InjectionKey<{
  state: ShallowReactive<{
    total: number
    data: any[]
  }>;
  props: ProTableProps;
  fetchData: (resetPage?: boolean) => Promise<void>
  getQueryParams: () => {
    api: string
    query: Record<string, any>
    extra?: Record<string, any>
    sortKeys?: Record<string, 'default' | 'asc' | 'dsc'>
  }
  find: () => any[],
  deleteRow: (index: number) => void,
  getColumns: () => ProTableColumn[]
}> = Symbol('proTableContextKey')

export const proTableHeightKey: InjectionKey<{
  /** 设置tools高度 */
  setToolsHeight: (height: number) => void
}> = Symbol('proTableHeightKey')