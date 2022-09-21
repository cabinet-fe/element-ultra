import type { ExtractPropTypes, PropType, VNode } from 'vue'

export const nodeRenderProps = {
  /** 需要渲染的虚拟dom */
  nodes: {
    type: [Array, Object] as PropType<VNode[] | VNode>
  }
} as const

export type nodeRenderProps = ExtractPropTypes<typeof nodeRenderProps>
