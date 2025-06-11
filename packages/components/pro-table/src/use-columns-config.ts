import { ProTableColumn } from './pro-table'
import { shallowReactive, isReactive, watch, shallowRef, provide } from 'vue'
import type { ProTableProps } from './pro-table'
import { useRoute } from 'vue-router'
import { proTableColumnsKey } from './token'
import { dfs } from '@element-ultra/utils'

export function useColumnsConfig(props: ProTableProps) {
  const route = useRoute()

  const localKey = `pro-table-columns:${route.path}`

  const cachedColumnsVal = localStorage.getItem(localKey)
  const cachedColumns = cachedColumnsVal ? JSON.parse(cachedColumnsVal) : null

  /** 原始列 */
  let originalColumns: Record<string, ProTableColumn> = {}

  const keys = ['fixed', 'align', 'width', 'visible']

  function mergeColumn(column: ProTableColumn, columnToMerge: ProTableColumn) {
    if (!columnToMerge) return

    keys.forEach(key => {
      // @ts-ignore
      column[key] = columnToMerge[key]
    })
  }

  /** 响应式列 */
  const columns = shallowRef<ProTableColumn[]>([])

  function recursive(columns: ProTableColumn[]) {
    return columns?.map(column => {
      // 响应式处理
      if (!isReactive(column)) {
        column = shallowReactive(column)
      }

      if (cachedColumns) {
        const cachedColumn = cachedColumns[column.key]

        if (cachedColumn) {
          mergeColumn(column, cachedColumn)
        }
      }

      if (column.children) {
        column.children = recursive(column.children)
      }

      return column
    })
  }

  watch(
    () => props.columns,
    c => {
      originalColumns = {}
      c &&
        dfs(c, column => {
          originalColumns[column.key] = JSON.parse(JSON.stringify(column))
        })
      columns.value = c ? recursive(c) : []
    },
    { immediate: true }
  )

  // 扁平化列
  const flattedColumns = shallowRef<ProTableColumn[]>([])
  const getFlattedColumns = (
    columns: ProTableColumn[],
    result: ProTableColumn[],
    depth = 0
  ) => {
    columns.forEach(column => {
      column.depth = depth
      result.push(column)
      column.children?.length &&
        getFlattedColumns(column.children, result, depth + 1)
    })

    return result
  }
  watch(
    columns,
    columns => {
      flattedColumns.value = getFlattedColumns(columns, [])
    },
    { immediate: true }
  )

  // 事件
  const handleSave = () => {
    localStorage.setItem(
      localKey,
      JSON.stringify(
        flattedColumns.value.reduce((acc, item) => {
          const { width, fixed, align, visible } = item
          acc[item.key] = { width, fixed, align, visible }
          return acc
        }, {} as Record<string, any>)
      )
    )
  }

  const handleReset = () => {
    localStorage.removeItem(localKey)
    flattedColumns.value.forEach(item => {
      mergeColumn(item, originalColumns[item.key])
    })
  }

  provide(proTableColumnsKey, {
    columns,
    handleSave,
    handleReset,
    flattedColumns
  })

  return {
    columns
  }
}
