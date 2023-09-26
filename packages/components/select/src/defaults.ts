import { EmitFn, isValidComponentSize } from '@element-ultra/utils'
import { useTooltipContentProps } from '@element-ultra/components/tooltip'
import { CircleClose } from 'icon-ultra'

import type { PropType, Component } from 'vue'
import {
  FORM_COMPONENT_PROPS,
  type ComponentSize,
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT
} from '@element-ultra/shared'
import type { Options } from '@element-ultra/components/popper'

export const SelectProps = {
  ...FORM_COMPONENT_PROPS,
  allowCreate: Boolean,
  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none'
  },
  automaticDropdown: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: CircleClose
  },
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  collapseTags: {
    type: Boolean
  },
  defaultFirstOption: Boolean,
  disabled: {
    type: Boolean,
    default: undefined
  },
  estimatedOptionHeight: {
    type: Number,
    default: undefined
  },
  filterable: Boolean,
  filterMethod: Function,
  height: {
    type: Number,
    default: 170 // 5 items by default
  },
  itemHeight: {
    type: Number,
    default: 34
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
  modelValue: {
    type: [Array, String, Number, Boolean, Object] as PropType<
      any[] | string | number | boolean | Record<string, any> | any
    >,
    default: undefined
  },
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
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
    default: true
  },
  options: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  popperAppendToBody: {
    type: Boolean,
    default: undefined
  },
  teleported: useTooltipContentProps.teleported,
  popperClass: {
    type: String,
    default: ''
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({} as Partial<Options>)
  },
  remote: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false
  },
  selectable: {
    type: Function as PropType<(node: any) => boolean>
  },
  text: {
    type: String
  },
  textField: {
    type: String
  }
}

export const SelectEmits = {
  [UPDATE_MODEL_EVENT]: (
    val: any,
    label: string | string[],
    option?: Record<string, any> | Record<string, any>[]
  ) => true,
  [CHANGE_EVENT]: (
    val: any,
    label: string | string[],
    option?: Record<string, any> | Record<string, any>[]
  ) => true,
  'update:text': (label: string) => true,
  'remove-tag': (tag: Record<string, any>) => true,
  clear: () => true,
  'visible-change': (visible: boolean) => true,
  focus: (event: FocusEvent) => true,
  blur: () => true
}

export type SelectEmitFn = EmitFn<typeof SelectEmits>

export const OptionProps = {
  disabled: {
    type: Boolean
  },
  hovering: {
    type: Boolean
  },
  item: {
    type: Object as PropType<Record<string, any>>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  style: {
    type: Object
  },
  selected: {
    type: Boolean
  },
  created: {
    type: Boolean
  }
}
