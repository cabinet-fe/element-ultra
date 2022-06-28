import { computed } from 'vue'
import type { DataTableColumn, DataTableProps } from '../data-table'
import { bfs } from '../utils'

/**
 * 转化列为组件所需的数据结构
 * @param props 表格属性
 */
export function useColumns(props: DataTableProps) {
  const { columns } = props

  // 获取二维表头
  const headerRows = computed(() => bfs(columns))

  // 深度优先遍历获取列的叶子节点(叶子节点才会在最终被data读取其key)
  const leafColumns = computed(() => {
    let result: DataTableColumn[] = []
    const recursive = (arr: any[]) => {
      arr.forEach(item => {
        if (!item.children) {
          return result.push(item)
        }
        recursive(item.children)
      })
    }
    recursive(columns)
    return result
  })

  return {
    headerRows,
    leafColumns
  }
}
