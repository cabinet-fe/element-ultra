import { last } from 'lodash'
import type { DataTableColumn } from './data-table'

export interface TableHeader {
  /** 节点数据 */
  data: DataTableColumn
  /** 子节点 */
  children?: TableHeader[]
  /** 父节点 */
  parent: TableHeader | null
  /** 深度 */
  depth: number
  /** 是否是叶子节点 */
  isLeaf: boolean
  /** 以当前节点为根的子树的size */
  size: number
}

/**
 * 广度优先遍历
 * @param treeData 构成树的数据
 * @returns 返回每层的节点
 */
export function bfs(treeData: DataTableColumn[]) {
  const dataToNodes = (
    data: DataTableColumn[],
    depth: number,
    parent: TableHeader | null = null
  ): TableHeader[] => {
    return data.map(item => {
      return {
        data: item,
        parent: parent,
        depth: depth,
        isLeaf: !item.children?.length,
        size: 0
      }
    })
  }

  let result = [dataToNodes(treeData, 0)]
  let ending = false
  while (!ending) {
    ending = true
    // 往下层遍历
    let nextNodes: TableHeader[] = []
    last(result)?.forEach(node => {
      let { children } = node.data
      if (children?.length) {
        let childrenNodes = dataToNodes(children, node.depth + 1, node)
        node.children = childrenNodes
        nextNodes = nextNodes.concat(childrenNodes)
        ending = false
      }
    })

    nextNodes.length && result.push(nextNodes)
  }

  // 从最后一层开始从下往上获取所有子树的叶子节点数量
  let len = result.length
  while (--len > 0) {
    result[len].forEach(node => {
      node.parent!.size += node.size || 1
    })
  }

  return result
}
