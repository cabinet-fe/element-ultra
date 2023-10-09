import { isLeaf } from '@element-ultra/utils'
import type { default as CascadeNode } from './node'

export const getMenuIndex = (el: HTMLElement) => {
  if (!el) return 0
  const pieces = el.id.split('-')
  return Number(pieces[pieces.length - 2])
}

export const checkNode = (el) => {
  if (!el) return

  const input = el.querySelector('input')
  if (input) {
    input.click()
  } else if (isLeaf(el)) {
    el.click()
  }
}

/** 通过原始顺序排序 */
export const sortByOriginalOrder = (
  oldNodes: CascadeNode[],
  newNodes: CascadeNode[]
) => {
  const newNodesCopy = newNodes.slice(0)
  // 新节点id
  const newIds = newNodesCopy.map((node) => node.uid)

  // 循环旧的节点，如果旧的节点和在新的节点中存在（UID相同）则使用旧节点， 并删除新节点里面的节点
  const res = oldNodes.reduce((acc, item) => {
    const index = newIds.indexOf(item.uid)
    if (index > -1) {
      acc.push(item)
      newNodesCopy.splice(index, 1)
      newIds.splice(index, 1)
    }
    return acc
  }, [] as CascadeNode[])

  // 追加剩余的新节点到末尾
  res.push(...newNodesCopy)

  return res
}
