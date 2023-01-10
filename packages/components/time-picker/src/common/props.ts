import { isValidComponentSize } from '@element-ultra/utils'
import { CircleClose } from 'icon-ultra'

import type { PropType, Component } from 'vue'
import type { Options } from '@popperjs/core'
import { FORM_COMPONENT_PROPS, type ComponentSize } from '@element-ultra/constants'

export const timePickerDefaultProps = {
  ...FORM_COMPONENT_PROPS,
  id: {
    type: [Array, String] as PropType<string[] | string>,
  },
  name: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  format: {
    type: String,
  },
  valueFormat: {
    type: String as PropType<string>,
    default: '',
  },
  type: {
    type: String as PropType<
      | 'year'
      | 'month'
      | 'date'
      | 'dates'
      | 'datetime'
      | 'week'
      | 'datetimerange'
      | 'daterange'
      | 'monthrange'
    >,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: CircleClose,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  prefixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: '',
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({}),
  },
  modelValue: {
    type: [Date, Array, String, Number] as PropType<
      number | string | Date | (number | string | Date)[]
    >,
    default: '',
  },
  rangeSeparator: {
    type: String,
    default: '至',
  },
  startPlaceholder: {
    type: String,
    default: '开始日期',
  },
  endPlaceholder: {
    type: String,
    default: '结束日期',
  },
  defaultValue: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  defaultTime: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  isRange: {
    type: Boolean,
    default: false,
  },
  disabledHours: {
    type: Function,
  },
  disabledMinutes: {
    type: Function,
  },
  disabledSeconds: {
    type: Function,
  },
  disabledDate: {
    type: Function,
  },
  cellClassName: {
    type: Function,
  },
  shortcuts: {
    type: Array,
    default: () => [],
  },
  arrowControl: {
    type: Boolean,
    default: false,
  },
  unlinkPanels: Boolean,
  start: {
    type: [Number, String, Date] as PropType<number | string | Date>,
  },
  end: {
    type: [Number, String, Date] as PropType<number | string | Date>,
  },
}
