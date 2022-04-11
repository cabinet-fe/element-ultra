<template>
  <label
    :class="[
      ns.b('button'),
      ns.is('active', modelValue === value),
      ns.is('disabled', disabled),
      ns.is('focus', focus),
      ns.bm('button', size)
    ]"
    role="radio"
    :aria-checked="modelValue === value"
    :aria-disabled="disabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="modelValue = disabled ? modelValue : value"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      :class="ns.be('button', 'original-radio')"
      :value="value"
      type="radio"
      :name="name"
      :disabled="disabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span
      :class="ns.be('button', 'inner')"
      :style="modelValue === value ? activeStyle : {}"
      @keydown.stop
    >
      <slot>
        {{ value }}
      </slot>
    </span>
  </label>
</template>
<script setup lang="ts">
import { computed, } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { useRadio, radioEmits } from './radio'
import { radioButtonProps } from './radio-button'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ElRadioButton'
})

const props = defineProps(radioButtonProps)
const emit = defineEmits(radioEmits)

const ns = useNamespace('radio')

const { radioRef, focus, size, disabled, tabIndex, modelValue, radioGroup } = useRadio(
  props,
  emit
)

const activeStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: radioGroup?.fill || '',
    borderColor: radioGroup?.fill || '',
    boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
    color: radioGroup?.textColor || ''
  }
})
</script>
