<template>
  <component :is="tag" :class="ns.b('group')">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useEventWatch, useFormItem, useNamespace } from 'hooks'
import { checkboxGroupProps, checkboxGroupEmit } from './checkbox-group'
import { checkboxGroupInjectionKey } from './token'

defineOptions({
  name: 'ElCheckboxGroup'
})

const ns = useNamespace('checkbox')

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmit)

let checkedValue = ref(new Set<string | number>())
let checkedLabel = ref(new Set<string | number>())

const { formItem, form } = useFormItem()

const handleItemChange = (
  checked: boolean,
  value: string | number,
  label: string | number
) => {
  run(() => {
    checkedValue.value[checked ? 'add' : 'delete'](value)
    checkedLabel.value[checked ? 'add' : 'delete'](label)

    const modelValue = Array.from(checkedValue.value)
    const labelValue = Array.from(checkedValue.value)

    emit('update:modelValue', modelValue)
    emit('change', modelValue, labelValue)
    formItem?.validate()
  })
}

const groupDisabled = computed(() => {
  return props.disabled || form?.props.disabled
})

const [run] = useEventWatch(
  () => props.modelValue,
  {
    onChangeNotByEvent: v => (checkedValue.value = new Set(v))
  },
  {
    immediate: true
  }
)

provide(checkboxGroupInjectionKey, {
  isGroup: true,
  groupDisabled,
  groupProps: props,
  groupCheckedSet: checkedValue,
  handleItemChange
})
</script>
