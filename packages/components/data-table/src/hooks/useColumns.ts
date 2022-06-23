import { computed } from 'vue'
import type { DataTableColumn, DataTableProps } from '../data-table'

/**
 * 转化列为组件所需的数据结构
 * @param props 表格属性
 */
export function useColumns(props: DataTableProps) {
  const { columns } = props

  // 广度优先遍历获取表头
  const headers = computed(() => {
    // 二维表头
    let result: Array<DataTableColumn>[] = []

    // 广度优先遍历
    let current: any[] = columns.slice()
    let next: any[] = []
    let temp: any = []
    while (current.length || next.length || temp.length) {
      if (current.length) {
        let item = current.shift()
        temp.push(item)
        if (item.children) {
          next = next.concat(item.children)
        }
        continue
      }

      result.push(temp)
      temp = []

      if (next.length) {
        current = next
        next = []
      }
    }

    console.log(result)
    return result
  })

  // 深度优先遍历获取列的叶子节点(叶子节点才会在最终被data读取其key)
  const leafColumns = computed(() => {
    let result: DataTableColumn[] = []
    const recursive = (arr: any[]) => {
      arr.forEach((item) => {
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
    headers,
    leafColumns,
  }
}
