import { computed, ref, shallowRef, watch } from 'vue'
import {
  NODE_CLICK,
  NODE_COLLAPSE,
  NODE_EXPAND,
  CURRENT_CHANGE,
  TreeOptionsEnum,
  TreeEmit
} from '../virtual-tree'
import { useCheck } from './useCheck'
import { useFilter } from './useFilter'
import type {
  TreeProps,
  TreeNodeData,
  TreeKey,
  TreeNode,
  TreeData,
  Tree
} from '../types'
import { dfs, getChainValue } from '@element-ultra/utils'

export function useTree(props: TreeProps, emit: TreeEmit) {
  const expandedKeySet = ref(new Set<TreeKey>())

  watch(
    [
      () => props.data,
      () => props.defaultExpandAll,
      () => props.defaultExpandedKeys
    ],
    ([data, expandAll, defaultExpandedKeys]) => {
      let expandedKeys = defaultExpandedKeys

      if (!expandedKeys) {
        if (!expandAll) return
        const valueKey = props.props.value ?? 'value'
        expandedKeys = []
        dfs(data, item => {
          expandedKeys!.push(getChainValue(item, valueKey))
        })
      }

      expandedKeySet.value = new Set(expandedKeys)
    }
  )

  const currentKey = ref<TreeKey | undefined>(props.currentNodeKey)
  const tree = shallowRef<Tree | undefined>()

  watch(
    () => props.currentNodeKey,
    key => {
      currentKey.value = key
    }
  )

  const {
    isIndeterminate,
    isChecked,
    toggleCheckbox,
    getChecked,
    getHalfChecked,
    setChecked,
    setCheckedKeys,
    setCheckedAll
  } = useCheck(props, tree)

  const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = useFilter(
    props,
    tree
  )

  const valueKey = computed(() => {
    return props.props?.value || TreeOptionsEnum.KEY
  })
  const childrenKey = computed(() => {
    return props.props?.children || TreeOptionsEnum.CHILDREN
  })
  const disabledKey = computed(() => {
    return props.props?.disabled || TreeOptionsEnum.DISABLED
  })
  const labelKey = computed(() => {
    return props.props?.label || TreeOptionsEnum.LABEL
  })

  watch(
    () => props.data,
    (data: TreeData) => {
      setData(data)
    },
    { immediate: true }
  )

  const flattenTree = computed(() => {
    const expandedKeys = expandedKeySet.value
    const hiddenKeys = hiddenNodeKeySet.value
    const flattenNodes: TreeNode[] = []
    const nodes = (tree.value && tree.value.treeNodes) || []

    function traverse() {
      const stack: TreeNode[] = []
      for (let i = nodes.length - 1; i >= 0; --i) {
        stack.push(nodes[i])
      }
      while (stack.length) {
        const node = stack.pop()
        if (!node) continue
        if (!hiddenKeys.has(node.key)) {
          flattenNodes.push(node)
        }

        if (expandedKeys.has(node.key)) {
          const children = node.children
          if (children) {
            const length = children.length
            for (let i = length - 1; i >= 0; --i) {
              stack.push(children[i])
            }
          }
        }
      }
    }

    traverse()

    return flattenNodes
  })

  const isNotEmpty = computed(() => {
    return flattenTree.value.length > 0
  })

  function createTree(data: TreeData): Tree {
    const treeNodeMap: Map<TreeKey, TreeNode> = new Map()
    const levelTreeNodeMap: Map<number, TreeNode[]> = new Map()
    let maxLevel = 1
    function traverse(
      nodes: TreeData,
      level = 1,
      parent: TreeNode | undefined = undefined
    ) {
      const siblings: TreeNode[] = []
      for (let index = 0; index < nodes.length; ++index) {
        const rawNode = nodes[index]
        const value = getKey(rawNode)
        const node: TreeNode = {
          level,
          key: value,
          data: rawNode
        }
        node.label = getLabel(rawNode)
        node.parent = parent
        const children = getChildren(rawNode)
        node.disabled = getDisabled(rawNode)
        node.isLeaf = !children || children.length === 0
        if (children && children.length) {
          node.children = traverse(children, level + 1, node)
        }
        siblings.push(node)
        treeNodeMap.set(value, node)
        if (!levelTreeNodeMap.has(level)) {
          levelTreeNodeMap.set(level, [])
        }
        levelTreeNodeMap.get(level)?.push(node)
      }
      if (level > maxLevel) {
        maxLevel = level
      }
      return siblings
    }
    const treeNodes: TreeNode[] = traverse(data)
    return {
      treeNodeMap,
      levelTreeNodeMap,
      maxLevel,
      treeNodes
    }
  }

  function filter(query: string) {
    const keys = doFilter(query)
    if (keys) {
      expandedKeySet.value = keys
    }
  }

  function getChildren(node: TreeNodeData): TreeNodeData[] {
    return node[childrenKey.value]
  }

  function getKey(node: TreeNodeData): TreeKey {
    if (!node) {
      return ''
    }
    return getChainValue(node, valueKey.value)
  }

  function getDisabled(node: TreeNodeData): boolean {
    return getChainValue(node, disabledKey.value)
  }

  function getLabel(node: TreeNodeData): string {
    return getChainValue(node, labelKey.value)
  }

  function toggleExpand(node: TreeNode) {
    const expandedKeys = expandedKeySet.value
    if (expandedKeys.has(node.key)) {
      collapse(node)
    } else {
      expand(node)
    }
  }

  function handleNodeClick(node: TreeNode, e: MouseEvent) {
    emit(NODE_CLICK, node.data, node, e)
    handleCurrentChange(node)
    if (props.expandOnClickNode) {
      toggleExpand(node)
    }
    if (props.showCheckbox && props.checkOnClickNode && !node.disabled) {
      toggleCheckbox(node, !isChecked(node), true)
    }
  }

  function handleCurrentChange(node: TreeNode) {
    if (!isCurrent(node)) {
      currentKey.value = node.key
      emit(CURRENT_CHANGE, node.data, node)
    } else {
      currentKey.value = undefined
      emit(CURRENT_CHANGE, undefined, undefined)
    }
  }

  function handleNodeCheck(node: TreeNode, checked: boolean) {
    toggleCheckbox(node, checked)
  }

  function expand(node: TreeNode) {
    const keySet = expandedKeySet.value
    if (tree?.value && props.accordion) {
      // whether only one node among the same level can be expanded at one time
      const { treeNodeMap } = tree.value
      keySet.forEach(key => {
        const node = treeNodeMap.get(key)
        if (node && node.level === node.level) {
          keySet.delete(key)
        }
      })
    }
    keySet.add(node.key)
    emit(NODE_EXPAND, node.data, node)
  }

  function collapse(node: TreeNode) {
    expandedKeySet.value.delete(node.key)
    emit(NODE_COLLAPSE, node.data, node)
  }

  function isExpanded(node: TreeNode): boolean {
    return expandedKeySet.value.has(node.key)
  }

  function isDisabled(node: TreeNode): boolean {
    return !!node.disabled
  }

  function isCurrent(node: TreeNode): boolean {
    const current = currentKey.value
    return !!current && current === node.key
  }

  function getCurrentNode(): TreeNodeData | undefined {
    if (!currentKey.value) return undefined
    return tree?.value?.treeNodeMap.get(currentKey.value)?.data
  }

  function getCurrentKey(): TreeKey | undefined {
    return currentKey.value
  }

  function setCurrentKey(key: TreeKey | undefined): void {
    currentKey.value = key
  }

  function setData(data: TreeData) {
    tree.value = createTree(data)
  }

  function getTreeNodes() {
    return tree.value
  }

  return {
    tree,
    flattenTree,
    isNotEmpty,
    getKey,
    getChildren,
    toggleExpand,
    toggleCheckbox,
    isExpanded,
    isChecked,
    isIndeterminate,
    isDisabled,
    isCurrent,
    isForceHiddenExpandIcon,
    handleNodeClick,
    handleNodeCheck,
    // expose
    getCurrentNode,
    getCurrentKey,
    setCurrentKey,
    getChecked,
    getHalfChecked,
    setChecked,
    setCheckedKeys,
    filter,
    setData,
    setCheckedAll,
    getTreeNodes
  }
}
