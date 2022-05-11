import { nextTick, ref, watch, getCurrentInstance } from 'vue'
import {
  NODE_CHECK_CHANGE,
  NODE_CHECK,
  SetOperationEnum,
  treeProps
} from '../virtual-tree'
import type { Ref } from 'vue'
import type { TreeProps, TreeKey, TreeNode, Tree, TreeNodeData } from '../types'

export function useCheck(props: TreeProps, tree: Ref<Tree | undefined>) {
  const checkedKeys = ref<Set<TreeKey>>(new Set())
  const indeterminateKeys = ref<Set<TreeKey>>(new Set())
  const { emit } = getCurrentInstance()!

  watch(
    () => tree.value,
    () => {
      return nextTick(() => {
        _setCheckedKeys(props.defaultCheckedKeys)
      })
    },
    {
      immediate: true
    }
  )

  /** 更新选中的节点 */
  const updateCheckedKeys = () => {
    if (!tree.value || !props.showCheckbox || props.checkStrictly) {
      return
    }
    const { levelTreeNodeMap, maxLevel } = tree.value
    const checkedKeySet = checkedKeys.value
    const indeterminateKeySet = new Set<TreeKey>()
    // 从最深的节点开始遍历树可以更容易确定半选中状态
    // 叶子节点没有半选中状态并且可以被跳过
    for (let level = maxLevel - 1; level >= 1; --level) {
      const nodes = levelTreeNodeMap.get(level)
      if (!nodes) continue
      nodes.forEach((node) => {
        const children = node.children
        if (children) {
          // Whether all child nodes are selected
          let allChecked = true
          // Whether a child node is selected
          let hasChecked = false
          for (let i = 0; i < children.length; ++i) {
            const childNode = children[i]
            const key = childNode.key
            if (checkedKeySet.has(key)) {
              hasChecked = true
            } else if (indeterminateKeySet.has(key)) {
              allChecked = false
              hasChecked = true
              break
            } else {
              allChecked = false
            }
          }
          if (allChecked) {
            // 全部选中
            checkedKeySet.add(node.key)
          } else if (hasChecked) {
            // 仅有部分选中
            indeterminateKeySet.add(node.key)
            checkedKeySet.delete(node.key)
          } else {
            // 全部没有选中
            checkedKeySet.delete(node.key)
            indeterminateKeySet.delete(node.key)
          }
        }
      })
    }
    indeterminateKeys.value = indeterminateKeySet
  }

  const isChecked = (node: TreeNode) => checkedKeys.value.has(node.key)

  const isIndeterminate = (node: TreeNode) =>
    indeterminateKeys.value.has(node.key)

  const toggleCheckbox = (
    node: TreeNode,
    isChecked: boolean,
    nodeClick = true
  ) => {
    const checkedKeySet = checkedKeys.value
    const toggle = (node: TreeNode, checked: boolean) => {
      checkedKeySet[checked ? SetOperationEnum.ADD : SetOperationEnum.DELETE](
        node.key
      )
      const children = node.children
      if (!props.checkStrictly && children) {
        children.forEach((childNode) => {
          if (!childNode.disabled) {
            toggle(childNode, checked)
          }
        })
      }
    }
    toggle(node, isChecked)
    updateCheckedKeys()
    if (nodeClick) {
      afterNodeCheck(node, isChecked)
    }
  }

  const afterNodeCheck = (node: TreeNode, checked: boolean) => {
    const { nodes: checkedNodes, keys: checkedKeys } = getChecked()
    const { nodes: halfCheckedNodes, keys: halfCheckedKeys } = getHalfChecked()
    emit(NODE_CHECK, node.data, {
      checkedNodes,
      checkedKeys,
      halfCheckedNodes,
      halfCheckedKeys
    })
    emit(NODE_CHECK_CHANGE, node.data, checked)
  }

  // TODO除了keys和Nodes还应该返回一个半选中的节点
  function getChecked(leafOnly = false) {
    const nodes: TreeNodeData[] = []
    const keys: TreeKey[] = []

    if (!tree.value || !props.showCheckbox) {
      return { keys, nodes }
    }

    const { treeNodeMap } = tree.value
    checkedKeys.value.forEach((key) => {
      const node = treeNodeMap.get(key)
      if (node && (!leafOnly || (leafOnly && node.isLeaf))) {
        keys.push(key)
        nodes.push(node.data)
      }
    })
    return {
      keys,
      nodes
    }
  }

  /** 获取半选中的节点 */
  function getHalfChecked() {
    const nodes: TreeNodeData[] = []
    const keys: TreeKey[] = []

    if (tree?.value && props.showCheckbox) {
      const { treeNodeMap } = tree.value
      indeterminateKeys.value.forEach((key) => {
        const node = treeNodeMap.get(key)
        if (!node) return
        keys.push(key)
        nodes.push(node.data)
      })
    }
    return {
      nodes,
      keys
    }
  }

  function setCheckedKeys(keys: TreeKey[]) {
    checkedKeys.value.clear()
    _setCheckedKeys(keys)
  }

  function setChecked(key: TreeKey, isChecked: boolean) {
    if (tree?.value && props.showCheckbox) {
      const node = tree.value.treeNodeMap.get(key)
      if (node) {
        toggleCheckbox(node, isChecked, false)
      }
    }
  }

  function _setCheckedKeys(keys: TreeKey[]) {
    if (tree?.value) {
      const { treeNodeMap } = tree.value
      if (props.showCheckbox && treeNodeMap && keys) {
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
          const node = treeNodeMap.get(key)
          if (node && !isChecked(node)) {
            toggleCheckbox(node, true, false)
          }
        }
      }
    }
  }

  /** TODO 还没有完成， 暂时这样写  */
  function setCheckedAll() {
    if (!tree?.value) return
    const { treeNodeMap } = tree.value
    for (let entry of treeNodeMap) {
      const node = treeNodeMap.get(entry[0])!
      toggleCheckbox(node, true, false)
    }
  }

  return {
    updateCheckedKeys,
    toggleCheckbox,
    isChecked,
    isIndeterminate,
    setChecked,
    setCheckedKeys,
    getChecked,
    getHalfChecked,
    setCheckedAll
  }
}
