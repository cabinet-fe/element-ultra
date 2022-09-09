import type { InjectionKey } from 'vue'
import type { DataTableProps } from './data-table'
import type useColumns from './hooks/use-columns'
import type useStyle from './hooks/use-style'
import type useState from './hooks/use-state'

export const dataTableToken: InjectionKey<
  {
    rootProps: DataTableProps
    state: ReturnType<typeof useState>
  } & ReturnType<typeof useColumns> &
    ReturnType<typeof useStyle>
> = Symbol()
