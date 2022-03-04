import { computed } from 'vue'
import { NOOP } from '@vue/shared'
import { ExpandTrigger } from './node'

import type { PropType } from 'vue'
import type {
  CascadeValue,
  CascadeOption,
  CascadeConfig,
  CascadeProps,
} from './node'

export const CommonProps = {
  modelValue: [Number, String, Array] as PropType<CascadeValue>,
  options: {
    type: Array as PropType<CascadeOption[]>,
    default: () => [] as CascadeOption[],
  },
  props: {
    type: Object as PropType<CascadeProps>,
    default: () => ({} as CascadeProps),
  },
}

export const DefaultProps: CascadeConfig = {
  expandTrigger: ExpandTrigger.CLICK,
  multiple: false,
  checkStrictly: false, // whether all nodes can be selected
  emitPath: true, // wether to emit an array of all levels value in which node is located
  lazy: false,
  lazyLoad: NOOP,
  value: 'value',
  label: 'label',
  children: 'children',
  leaf: 'leaf',
  disabled: 'disabled',
  hoverThreshold: 500,
}

export const useCascadeConfig = (props: { props: CascadeProps }) => {
  return computed(() => ({
    ...DefaultProps,
    ...props.props,
  }))
}
