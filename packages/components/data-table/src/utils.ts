import { last } from 'lodash'

interface TreeData {
  children?: TreeData[]
  [key: string]: any
}

export interface TreeNode {
  /** 节点数据 */
  data: TreeData
  /** 子节点 */
  children?: TreeNode[]
  /** 父节点 */
  parent: TreeNode | null
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
 * @param cb 回调
 * @returns
 */
export function bfs<T extends TreeData>(
  treeData: T[],
  cb?: (node: TreeNode) => void
) {
  const dataToNodes = (
    data: TreeData[],
    depth: number,
    parent: TreeNode | null = null
  ): TreeNode[] => {
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

  let result: TreeNode[][] = [dataToNodes(treeData, 0)]
  let ending = false
  while (!ending) {
    ending = true
    // 往下层遍历
    let nextNodes: TreeNode[] = []
    last(result)?.forEach(node => {
      cb?.(node)
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

  // 从最后一层开始从下往上获取所有子树的leafSize
  let len = result.length
  while (--len > 0) {
    result[len].forEach(node => {
      node.parent!.size += node.size || 1
    })
  }

  return result
}
