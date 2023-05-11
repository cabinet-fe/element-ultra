<template>
  <div ref="radioGroupRef" :class="ns.b('group')" role="radiogroup" @keydown="handleKeydown">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, onMounted, ref, reactive, toRefs } from 'vue'
import { EVENT_CODE, UPDATE_MODEL_EVENT } from 'shared'
import { radioGroupKey } from 'tokens'
import { useFormItem, useNamespace } from 'hooks'
import { radioGroupProps, type RadioGroupProps } from './radio-group'

defineOptions({
  name: 'ElRadioGroup'
})

const props = defineProps(radioGroupProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
}>()

const ns = useNamespace('radio')
const radioGroupRef = ref<HTMLDivElement>()
const { formItem } = useFormItem()

const changeEvent = (value: RadioGroupProps['modelValue']) => {
  emit(UPDATE_MODEL_EVENT, value)
  formItem?.validate()
  nextTick(() => emit('change', value))
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!radioGroupRef.value) return

  // 左右上下按键 可以在 radio 组内切换不同选项
  const target = e.target as HTMLInputElement
  const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
  const radios = radioGroupRef.value.querySelectorAll<HTMLInputElement>(className)
  const length = radios.length
  const index = Array.from(radios).indexOf(target)
  const roleRadios = radioGroupRef.value.querySelectorAll<HTMLInputElement>('[role=radio]')

  let nextIndex: number | null = null
  switch (e.code) {
    case EVENT_CODE.left:
    case EVENT_CODE.up:
      e.stopPropagation()
      e.preventDefault()
      nextIndex = index === 0 ? length - 1 : index - 1
      break
    case EVENT_CODE.right:
    case EVENT_CODE.down:
      e.stopPropagation()
      e.preventDefault()
      nextIndex = index === length - 1 ? 0 : index + 1
      break
    default:
      break
  }
  if (nextIndex === null) return
  roleRadios[nextIndex].click()
  roleRadios[nextIndex].focus()
}

onMounted(() => {
  const radios = radioGroupRef.value!.querySelectorAll<HTMLInputElement>('[type=radio]')
  const firstLabel = radios[0]
  if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
    firstLabel.tabIndex = 0
  }
})

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>
