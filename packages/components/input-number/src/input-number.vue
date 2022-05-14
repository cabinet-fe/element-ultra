<template>
  <div
    :class="[
      ns.b(),
      ns.m(inputNumberSize),
      ns.is('disabled', inputNumberDisabled),
      ns.is('without-controls', !controls)
    ]"
    @dragstart.prevent
  >
    <el-input
      ref="input"
      type="number"
      :step="step"
      :model-value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="emit('focus', $event)"
      @input="handleInput"
      @change="handleInputChange"
    >
      <template v-if="append || $slots.append" #append>
        <slot name="append">
          {{ append }}
        </slot>
      </template>
    </el-input>

    <template v-if="controls">
      <span
        @click="decrease"
        role="button"
        :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]"
        @keydown.enter="decrease"
      >
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>

      <span
        @click="increase"
        role="button"
        :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]"
        @keydown.enter="increase"
      >
        <el-icon>
          <ArrowUp />
        </el-icon>
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  reactive,
  ref,
  watch,
  onMounted,
  onUpdated,
  type WatchCallback,
  shallowRef
} from 'vue'

import { ElIcon } from '@element-ultra/components/icon'
import { useFormItem, useNamespace } from '@element-ultra/hooks'
import ElInput from '@element-ultra/components/input'
import { isNumber, debugWarn } from '@element-ultra/utils'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { inputNumberProps, inputNumberEmits } from './input-number'
import type { ComponentPublicInstance } from 'vue'

// 数值精度
// 将计算的数值同时去掉所有小数点
defineOptions({
  name: 'ElInputNumber'
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const input = ref<ComponentPublicInstance<typeof ElInput>>()

const userInput = shallowRef('')



const { formItem, formDisabled, formSize } = useFormItem()
const ns = useNamespace('input-number')

const inputNumberDisabled = computed(() => {
  return props.disabled ?? formDisabled.value
})
const inputNumberSize = computed(() => {
  return props.size ?? formSize.value
})

/**
 * 获取合法的值
 * 在 min - max值之间
 * 符合精度
 */
function getValidValue(value: number): number
function getValidValue(): undefined
function getValidValue(value?: number): number | undefined
function getValidValue(value?: number) {
  if (value === undefined) {
    return value
  }
  // 确保在最大值最小值之间
  const { min, max, precision } = props
  if (value < min) {
    value = min
  }
  if (value > max) {
    value = max
  }
  // 确保精度
  if (precision === undefined || ~~precision < 0) return value

  let factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

/**
 * 输入框显示值
 * 1. 当为money为true时, 则始终以千分位显示
 * 2. 默认情况则和输入值一致
 */
const displayValue = computed(() => {
  const { modelValue } = props

  if (userInput.value) return userInput.value


  if (modelValue === undefined) return ''

  if (props.precision !== undefined) {
    return modelValue.toFixed(props.precision)
  }

  return String(modelValue)
})

/**
 * 步长操作
 * 将数值转化成整形计算最后再反向还原
 */
const stepValue = (val: number, type: 'increase' | 'decrease') => {
  let { precision } = props

  const precisionFactor = Math.pow(10, precision ?? 0)
  let intVal = precisionFactor * val
  const intStep = precisionFactor * props.step
  const intResult = intVal + (type === 'increase' ? intStep : -intStep)

  return getValidValue(intResult / precisionFactor)
}

const increase = () => {
  if (inputNumberDisabled.value || maxDisabled.value) return
  emitValue(stepValue(props.modelValue ?? 0, 'increase'))
}
const decrease = () => {
  if (inputNumberDisabled.value || minDisabled.value) return
  emitValue(stepValue(props.modelValue ?? 0, 'decrease'))
}

const minDisabled = computed(() => stepValue(props.modelValue ?? 0, 'decrease') < props.min)
const maxDisabled = computed(() => stepValue(props.modelValue ?? 0, 'increase') > props.max)

const emitValue = (newVal?: number) => {
  const oldVal = props.modelValue

  if (oldVal === newVal) return

  // 有值
  if (newVal !== undefined) {
    newVal = getValidValue(newVal)
  }

  emit('update:modelValue', newVal)
  emit('input', newVal)
  emit('change', newVal, oldVal)
}

/** 将字符串转化为数值 */
const setStringValue = (str: string) => {
  let numberValue = str ? +str : undefined

  // 不是一个数字
  if (Number.isNaN(numberValue)) {
    // userInput.value = props.modelValue === undefined ? '' : '' + props.modelValue
    return
  }
  emitValue(numberValue)
}

const handleInput = (value: string) => {
  userInput.value = value
}

const handleInputChange = (value: string) => {
  changedByEvent.value = true
  setStringValue(value)
  changedByEvent.value = false
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  formItem?.validate()
}

/** 非事件(用户操作)改变的值的变化 */
const changedByEvent = shallowRef(false)
watch(
  () => props.modelValue,
  v => {
    if (changedByEvent.value) return
    // 进行合法性纠正
    emit('update:modelValue', getValidValue(v))

  },
  { immediate: true }
)
</script>
