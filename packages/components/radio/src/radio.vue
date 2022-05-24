<template>
  <label
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('focus', focus),
      ns.is('bordered', border),
      ns.is('checked', modelValue === value),
      ns.m(size)
    ]"
    role="radio"
    :aria-checked="modelValue === value"
    :aria-disabled="disabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="modelValue = disabled ? modelValue : value"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', disabled),
        ns.is('checked', modelValue === value)
      ]"
    >
      <span :class="ns.e('inner')"></span>
      <input
        ref="radioRef"
        v-model="modelValue"
        :class="ns.e('original')"
        :value="value"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="disabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span :class="ns.e('label')" @keydown.stop>
      <slot> </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { useRadio, radioProps, radioEmits } from './radio'

defineOptions({
  name: 'ElRadio'
})

const props = defineProps(radioProps)

const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')
const { radioRef, focus, size, disabled, tabIndex, modelValue } = useRadio(
  props,
  emit
)

function handleChange() {
  nextTick(() => emit('change', modelValue.value as any))
}
</script>
