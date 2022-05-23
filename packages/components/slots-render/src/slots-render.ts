import type { ExtractPropTypes, PropType, VNode } from 'vue'

export const slotsRenderProps = {
  nodes: {
    type: Array as PropType<VNode[]>,
    required: true
  }
} as const

export type SlotsRenderProps = ExtractPropTypes<typeof slotsRenderProps>
