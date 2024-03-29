import { Star, StarFilled } from 'icon-ultra'
import { UPDATE_MODEL_EVENT } from '@element-ultra/shared'
import {
  isValidComponentSize,
  iconPropType,
} from '@element-ultra/utils'
import type { ComponentSize } from '@element-ultra/shared'
import type { Component, ExtractPropTypes, PropType } from 'vue'
import type Rate from './rate.vue'

export const rateProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  lowThreshold: {
    type: Number,
    default: 2,
  },
  highThreshold: {
    type: Number,
    default: 4,
  },
  max: {
    type: Number,
    default: 5,
  },
  colors: {
    type: [Array, Object] as PropType<string[] | Record<number, string>>,
    default: () =>
    [
      'var(--el-rate-star-color)',
      'var(--el-rate-star-color)',
      'var(--el-rate-star-color)',
    ],
  },
  voidColor: {
    type: String,
    default: 'var(--el-rate-void-color)',
  },
  disabledVoidColor: {
    type: String,
    default: 'var(--el-rate-disable-void-color)',
  },
  icons: {
    type: [Array, Object] as PropType<
      Array<string | Component> | Record<number, string | Component>
    >,
    default: () => [StarFilled, StarFilled, StarFilled],
  },
  voidIcon: {
    type: iconPropType,
    default: () => Star,
  },
  disabledvoidIcon: {
    type: iconPropType,
    default: () => StarFilled,
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  allowHalf: {
    type: Boolean,
    default: false,
  },
  showText: {
    type: Boolean,
    default: false,
  },
  showScore: {
    type: Boolean,
    default: false,
  },
  textColor: {
    type: String,
    default: 'var(--el-rate-text-color)',
  },
  texts: {
    type: Array as PropType<string[]>,
    default: () =>
    [
      'Extremely bad',
      'Disappointed',
      'Fair',
      'Satisfied',
      'Surprise',
    ],
  },
  scoreTemplate: {
    type: String,
    default: '{value}',
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
}

export type RateProps = ExtractPropTypes<typeof rateProps>

export const rateEmits = {
  change: (value: number) => typeof value === 'number',
  [UPDATE_MODEL_EVENT]: (value: number) => typeof value === 'number',
}
export type RateEmits = typeof rateEmits

export type RateInstance = InstanceType<typeof Rate>
