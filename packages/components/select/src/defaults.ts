import { isValidComponentSize } from '@element-ultra/utils'
import { useTooltipContentProps } from '@element-ultra/components/tooltip'
import { CircleClose } from '@element-plus/icons-vue'

import type { PropType, Component } from 'vue'
import { FORM_COMPONENT_PROPS, type ComponentSize } from '@element-ultra/constants'
import type { Options } from '@element-ultra/components/popper'

export const SelectProps = {
  ...FORM_COMPONENT_PROPS,
  allowCreate: Boolean,
  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none',
  },
  automaticDropdown: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: CircleClose,
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light',
  },
  collapseTags: Boolean,
  defaultFirstOption: Boolean,
  disabled: Boolean,
  estimatedOptionHeight: {
    type: Number,
    default: undefined,
  },
  filterable: Boolean,
  filterMethod: Function,
  height: {
    type: Number,
    default: 170, // 5 items by default
  },
  itemHeight: {
    type: Number,
    default: 34,
  },
  id: String,
  loading: Boolean,
  loadingText: {
    type: String,
    default: '加载中'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  modelValue: [Array, String, Number, Boolean, Object] as PropType<
    any[] | string | number | boolean | Record<string, any> | any
  >,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0,
  },
  name: String,
  noDataText: {
    type: String,
    default: '无数据'
  },
  noMatchText: {
    type: String,
    default: '无匹配数据'
  },
  remoteMethod: Function,
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array as PropType<Record<string, any>[]>,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  teleported: useTooltipContentProps.teleported,
  popperClass: {
    type: String,
    default: '',
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({} as Partial<Options>),
  },
  remote: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Function as PropType<(node: any) => boolean>
  }
}

export const OptionProps = {
  data: Array,
  disabled: Boolean,
  hovering: Boolean,
  item: Object,
  index: Number,
  style: Object,
  selected: Boolean,
  created: Boolean,
}
