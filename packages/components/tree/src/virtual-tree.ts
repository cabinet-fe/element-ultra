import type { InjectionKey, PropType } from 'vue'
import type { TreeNodeData } from './types'
import type {
  TreeNode,
  TreeKey,
  TreeData,
  TreeOptionProps,
  FilterMethod,
  CheckedInfo,
  TreeContext
} from './types'

// constants
export const ROOT_TREE_INJECTION_KEY: InjectionKey<TreeContext> = Symbol()
const EMPTY_NODE = {
  key: -1,
  level: -1,
  data: {}
} as const

// enums
export enum TreeOptionsEnum {
  KEY = 'value',
  LABEL = 'label',
  CHILDREN = 'children',
  DISABLED = 'disabled'
}

export const enum SetOperationEnum {
  ADD = 'add',
  DELETE = 'delete'
}

// props
export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    default: () => []
  },
  itemClass: {
    type: [String, Object],
    default: ''
  },
  itemSize: {
    type: Number,
    default: 26
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  height: {
    type: [Number, String],
    default: 200
  },
  props: {
    type: Object as PropType<TreeOptionProps>,
    default: () => ({
      children: TreeOptionsEnum.CHILDREN,
      label: TreeOptionsEnum.LABEL,
      disabled: TreeOptionsEnum.DISABLED,
      value: TreeOptionsEnum.KEY
    })
  },
  highlightCurrent: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultCheckedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  // Whether checked state of a node not affects its father and
  // child nodes when show-checkbox is true
  checkStrictly: {
    type: Boolean,
    default: false
  },
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  indent: {
    type: Number,
    default: 16
  },
  icon: {
    type: String
  },
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  checkOnClickNode: {
    type: Boolean,
    default: false
  },
  currentNodeKey: {
    type: [String, Number] as PropType<TreeKey>
  },
  // TODO need to optimization
  accordion: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function as PropType<FilterMethod>
  },
  // Performance mode will increase memory usage, but scrolling will be smoother
  perfMode: {
    type: Boolean,
    default: true
  },
  selectable: {
    type: Function as PropType<(node: any) => boolean>
  }
}

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    default: () => EMPTY_NODE
  },
  expanded: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  current: {
    type: Boolean,
    default: false
  },
  hiddenExpandIcon: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const

// emits
export const NODE_CLICK = 'node-click'
export const NODE_EXPAND = 'node-expand'
export const NODE_COLLAPSE = 'node-collapse'
export const CURRENT_CHANGE = 'current-change'
export const NODE_CHECK = 'check'
export const NODE_CHECK_CHANGE = 'check-change'
export const NODE_CONTEXTMENU = 'node-contextmenu'

export const treeEmits = {
  [NODE_CLICK]: (data: TreeNodeData, node: TreeNode, e: MouseEvent) => data && node && e,
  [NODE_EXPAND]: (data: TreeNodeData, node: TreeNode) => data && node,
  [NODE_COLLAPSE]: (data: TreeNodeData, node: TreeNode) => data && node,
  [CURRENT_CHANGE]: (data: TreeNodeData, node: TreeNode) => data && node,
  [NODE_CHECK]: (data: TreeNodeData, checkedInfo: CheckedInfo) => data && checkedInfo,
  [NODE_CHECK_CHANGE]: (data: TreeNodeData, checked: boolean) =>
    data && typeof checked === 'boolean',
  [NODE_CONTEXTMENU]: (event: Event, data: TreeNodeData, node: TreeNode) => event && data && node
}

export const treeNodeEmits = {
  click: (node: TreeNode, e: MouseEvent) => !!(node && e),
  toggle: (node: TreeNode) => !!node,
  check: (node: TreeNode, checked: boolean) => node && typeof checked === 'boolean'
}
