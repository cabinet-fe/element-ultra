import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TreeProps, TreeKey, TreeNode, Tree } from '../types'
import { getChainValue } from '@element-ultra/utils'

// When the data volume is very large using filter will cause lag
// I haven't found a better way to optimize it for now
// Maybe this problem should be left to the server side
export function useFilter(props: TreeProps, tree: Ref<Tree | undefined>) {
  const hiddenNodeKeySet = ref<Set<TreeKey>>(new Set([]))
  const hiddenExpandIconKeySet = ref<Set<TreeKey>>(new Set([]))


  let labelKey = props.props?.label ?? 'label'

  function doFilter(query: string) {
    const expandKeySet = new Set<TreeKey>()
    const hiddenExpandIconKeys = hiddenExpandIconKeySet.value
    const hiddenKeys = hiddenNodeKeySet.value
    const family: TreeNode[] = []
    const nodes = tree.value?.treeNodes || []
    const filter = props.filterMethod || ((query, data) => {
      return getChainValue(data, labelKey)?.includes(query)
    })
    hiddenKeys.clear()

    function traverse(nodes: TreeNode[]) {
      nodes.forEach((node) => {
        family.push(node)
        if (filter?.(query, node.data)) {
          family.forEach((member) => {
            expandKeySet.add(member.key)
          })
        } else if (node.isLeaf) {
          hiddenKeys.add(node.key)
        }
        const children = node.children
        if (children) {
          traverse(children)
        }
        if (!node.isLeaf) {
          if (!expandKeySet.has(node.key)) {
            hiddenKeys.add(node.key)
          } else if (children) {
            // If all child nodes are hidden, then the expand icon will be hidden
            let allHidden = true
            for (let i = 0; i < children.length; ++i) {
              const childNode = children[i]
              if (!hiddenKeys.has(childNode.key)) {
                allHidden = false
                break
              }
            }
            if (allHidden) {
              hiddenExpandIconKeys.add(node.key)
            } else {
              hiddenExpandIconKeys.delete(node.key)
            }
          }
        }
        family.pop()
      })
    }
    traverse(nodes)
    return expandKeySet
  }

  function isForceHiddenExpandIcon(node: TreeNode): boolean {
    return hiddenExpandIconKeySet.value.has(node.key)
  }

  return {
    hiddenExpandIconKeySet,
    hiddenNodeKeySet,
    doFilter,
    isForceHiddenExpandIcon,
  }
}
