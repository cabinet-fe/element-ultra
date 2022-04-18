<template>
  <label
    :class="[
      ns.b(),
      ns.m(checkboxSize),
      ns.is('disabled', isDisabled),
      ns.is('checked', isChecked)
    ]"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', isDisabled),
        ns.is('checked', isChecked),
        ns.is('indeterminate', indeterminate),
        ns.is('focus', focus)
      ]"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
    >
      <span :class="ns.e('inner')"></span>
      <input
        type="checkbox"
        :checked="isChecked"
        :class="ns.e('original')"
        :tabindex="tabindex"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span ref="labelRef" v-if="$slots.default || value" :class="ns.e('label')">
      <slot> {{ value }} </slot>
    </span>
  </label>
</template>
<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import { checkboxProps, checkboxEmit } from './checkbox'
import { useCheckbox } from './useCheckbox'

defineOptions({
  name: 'ElCheckbox'
})
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmit)

const ns = useNamespace('checkbox')

const { isChecked, focus, isDisabled, checkboxSize, handleChange } = useCheckbox(props, emit)
</script>
