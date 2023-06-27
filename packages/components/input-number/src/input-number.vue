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
      v-model="userInput"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :clearable="clearable"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="emit('focus', $event)"
      @change="handleInputChange"
    >
      <template
        v-if="append !== false && (append || $slots.append || money)"
        #append
      >
        <slot name="append">
          {{ append || '元' }}
        </slot>
      </template>
    </el-input>

    <template v-if="controls">
      <span
        @click="decrease"
        role="button"
        :class="[ns.e('decrease'), ns.is('disabled', minDisabled)]"
      >
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>

      <span
        @click="increase"
        role="button"
        :class="[ns.e('increase'), ns.is('disabled', maxDisabled)]"
      >
        <el-icon>
          <ArrowUp />
        </el-icon>
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch, shallowRef, nextTick } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { useFormItem, useNamespace } from '@element-ultra/hooks'
import ElInput from '@element-ultra/components/input'
import { ArrowUp, ArrowDown } from 'icon-ultra'
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

const { formItem, formDisabled, formSize } = useFormItem()
const ns = useNamespace('input-number')

const inputNumberDisabled = computed(() => {
  return props.disabled ?? formDisabled.value
})
const inputNumberSize = computed(() => {
  return props.size ?? formSize.value
})

const exactCalc = (
  n1: number,
  n2: number,
  calc: (int1: number, int2: number) => number
) => {
  let str1 = n1 + ''
  let str2 = n2 + ''
  let dotLength = Math.max(
    (str1.split('.')[1] || '').length,
    (str2.split('.')[1] || '').length
  )
  let factor = Math.pow(10, dotLength)
  return calc(n1 * factor, n2 * factor) / factor
}

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
  // 转化成整数计算
  let ret =  Math.round(value * factor) / factor

  return ret
}

const _increase = () => {
  return exactCalc(props.modelValue ?? 0, props.step, (n1, n2) => n1 + n2)
}

const _decrease = () => {
  return exactCalc(props.modelValue ?? 0, props.step, (n1, n2) => n1 - n2)
}

const increase = () => {
  if (inputNumberDisabled.value || maxDisabled.value) return
  changedByEvent.value = true
  emitValue(_increase())
  nextTick(() => setUserInput())
  changedByEvent.value = true
}
const decrease = () => {
  if (inputNumberDisabled.value || minDisabled.value) return
  changedByEvent.value = true
  emitValue(_decrease())
  nextTick(() => setUserInput())
  changedByEvent.value = true
}

const minDisabled = computed(() => _decrease() < props.min)
const maxDisabled = computed(() => _increase() > props.max)

const userInput = shallowRef('')
const setUserInput = () => {
  const { modelValue, money } = props

  if (!modelValue && modelValue !== 0) {
    userInput.value = ''
    return
  }

  if (money) {
    const isNegative = (modelValue ?? 0) < 0

    let valStr =  Math.abs(modelValue) +  '' // precision !== undefined ? modelValue.toFixed(precision) :
    let [valIntStr, valDotStr] = valStr.split('.')


    let group: string[] = []
    let i = valIntStr.length
    while (i > 0) {
      group.unshift(valIntStr.slice(i - 3 > 0 ? i - 3 : 0, i) + '')
      i -= 3
    }
    valStr = group.join(',')

    if (valDotStr) {
      valStr += `.${valDotStr}`
    }
    userInput.value = isNegative ? '-' + valStr : valStr
  } else {
    userInput.value = modelValue + ''
  }
}

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

const handleInputChange = (value: string) => {
  changedByEvent.value = true
  value = value.replace(/,/g, '')
  let numberValue = value ? +value : undefined
  if (!Number.isNaN(numberValue)) {
    emitValue(numberValue)
  }
  setUserInput()
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
    setUserInput()
  },
  { immediate: true }
)
</script>
