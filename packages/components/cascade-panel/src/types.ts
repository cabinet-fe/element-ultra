import type { VNode, InjectionKey } from 'vue'
import type { Nullable } from 'utils'
import type { default as CascadeNode } from './node'

export type { CascadeNode }

export type CascadeNodeValue = string | number
export type CascadeNodePathValue = CascadeNodeValue[]
export type CascadeValue =
  | CascadeNodeValue
  | CascadeNodePathValue
  | (CascadeNodeValue | CascadeNodePathValue)[]
export type CascadeConfig = Required<CascadeProps>
export type isDisabled = (data: CascadeOption, node: CascadeNode) => boolean
export type isLeaf = (data: CascadeOption, node: CascadeNode) => boolean
export type Resolve = (dataList?: CascadeOption[]) => void
export type LazyLoad = (node: CascadeNode, resolve: Resolve) => void
export type RenderLabel = ({
  node: CascadeNode,
  data: CascadeOption,
}) => VNode | VNode[]

export enum ExpandTrigger {
  CLICK = 'click',
  HOVER = 'hover',
}

export interface CascadeOption extends Record<string, unknown> {
  label?: string
  value?: CascadeNodeValue
  children?: CascadeOption[]
  disabled?: boolean
  leaf?: boolean
}

export interface CascadeProps {
  expandTrigger?: ExpandTrigger
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: LazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: string | isDisabled
  leaf?: string | isLeaf
  hoverThreshold?: number
}

export interface Tag {
  node?: CascadeNode
  key: number
  text: string
  hitState?: boolean
  closable: boolean
}

export interface ElCascadePanelContext {
  config: CascadeConfig
  expandingNode: Nullable<CascadeNode>
  checkedNodes: CascadeNode[]
  isHoverMenu: boolean
  initialLoaded: boolean
  renderLabelFn: RenderLabel
  lazyLoad: (
    node?: CascadeNode,
    cb?: (dataList: CascadeOption[]) => void
  ) => void
  expandNode: (node: CascadeNode, silent?: boolean) => void
  handleCheckChange: (
    node: CascadeNode,
    checked: boolean,
    emitClose?: boolean
  ) => void
}

export const Cascade_PANEL_INJECTION_KEY: InjectionKey<ElCascadePanelContext> =
  Symbol()
