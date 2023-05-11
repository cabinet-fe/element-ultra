<template>
  <ul :class="[ns.b(), ns.m(gridInputSize)]">
    <li
      v-for="(_, index) in max"
      :key="index"
      tabindex="0"
      @keydown="handleKeyDown($event, valueArray[index], index)"
      @focus="focus(index)"
      @blur="index === position && (blur = true)"
      :ref="getRef"
      :class="{
        [ns.e('item')]: true,
        [ns.m('focus')]: index === position && !blur
      }"
    >
      <span :class="ns.e('text')" v-if="valueArray[index]">
        {{ valueArray[index] }}
      </span>

      <span :class="ns.e('cursor')" v-else-if="index === position"></span>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useNamespace, useRefs, useSize } from 'hooks'
import { computed } from '@vue/reactivity'
import { shallowRef, watch } from 'vue'
import { gridInputProps } from './grid-input'

defineOptions({
  name: 'ElGridInput'
})

const [items, getRef] = useRefs()

const ns = useNamespace('grid-input')
const props = defineProps(gridInputProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const gridInputSize = useSize({
  props
})

let valueArray = shallowRef<string[]>([])
/** 光标位置 */
let position = shallowRef(0)
let blur = shallowRef(false)

const numberReg = computed(() => {
  return props.zero ? /^[0-9]$/ : /^[1-9]$/
})

const focus = async (index?: number) => {
  if (index === undefined) {
    focus(position.value)
    return
  }

  // 可以聚焦有值的输入框和其下一个输入框
  if (index !== 0 && index > valueArray.value.length) {
    position.value = valueArray.value.length
  } else {
    position.value = index
  }
  let dom = items.value[position.value]
  dom?.focus()
  blur.value = false
}

/** 设置值数组 */
const setValueArray = () => {
  if (props.modelValue) {
    valueArray.value = props.modelValue.split(props.separator)
  }
}

watch(
  () => props.modelValue,
  () => {
    setValueArray()
  }
)

const emitModelValue = () => {
  emit(
    'update:modelValue',
    valueArray.value.filter(v => v).join(props.separator)
  )
}

/** 更改值 */
const changeValue = (value: string, index: number) => {
  const currentValue = valueArray.value[index]

  if (currentValue) {
    valueArray.value.splice(index, 1, value)
  } else if (index === valueArray.value.length) {
    valueArray.value.push(value)
  } else {
    return
  }

  if (position.value < props.max - 1) {
    position.value++
  }

  focus()

  emitModelValue()
}

const KeyEventMethods = {
  /** 删除 */
  Backspace(value: string, index: number) {
    if (value) {
      valueArray.value.splice(index, 1)
    } else if (index - 1 >= 0) {
      valueArray.value.splice(index - 1, 1)
    }

    if (index !== 0) {
      focus(index - 1)
    }

    emitModelValue()
  },

  ArrowLeft(value: string, index: number) {
    if (index === 0) return
    focus(index - 1)
  },

  ArrowRight(value: string, index: number) {
    if (index === valueArray.value.length) return
    focus(index + 1)
  }
}

/** 按键事件 */
const handleKeyDown = (e: any, value: string, index: number) => {
  if (numberReg.value.test(e.key)) {
    changeValue(e.key, index)
    return
  }

  let handler = KeyEventMethods[e.key as keyof typeof KeyEventMethods]
  handler && handler(value, index)
}
</script>
