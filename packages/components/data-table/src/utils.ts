interface TreeData {
  children?: TreeData[]
  [key: string]: any
}

export interface TreeNode extends TreeData {
  _parent: TreeNode | null
  _depth: number
  _isLeaf: boolean
  _leafSize: number
}

/**
 * 广度优先遍历
 * @param treeData 构成树的数据
 * @param cb 回调
 * @returns
 */
export function bfs<T extends TreeData>(treeData: T[], cb?: (node: TreeNode) => void) {
  const dataToNode = (
    data: T,
    depth: number,
    parent: TreeNode | null = null
  ): TreeNode => {
    let childrenLen = data.children?.length ?? 0
    return {
      ...data,
      _parent: parent,
      _depth: depth,
      _isLeaf: !childrenLen,
      _leafSize: 0
    }
  }

  let result: TreeNode[][] = []
  let currentDepthNodes = treeData.map(item => dataToNode(item, 0))
  let nextDepthNodes: any[] = []

  while (currentDepthNodes.length) {
    nextDepthNodes = []

    currentDepthNodes.forEach(node => {
      cb?.(node)
      if (node.children) {
        nextDepthNodes = nextDepthNodes.concat(
          node.children.map(item =>
            dataToNode(item as T, node._depth + 1, node)
          )
        )
      }
    })
    result.push(currentDepthNodes)
    currentDepthNodes = nextDepthNodes
  }

  // 从最后一层开始从下往上获取所有子树的leafSize
  let levelStart = result.length - 1
  while (levelStart > 0) {
    result[levelStart].forEach(node => {
      node._parent!._leafSize += node._leafSize || 1
    })
    levelStart--
  }

  return result
}