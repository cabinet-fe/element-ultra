<template>
  <div
    :class="[
      ns.b(),
      ns.m(checkboxSize),
      ns.is('disabled', isDisabled),
      ns.is('checked', isChecked)
    ]"
    @click="inputRef?.click()"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', isDisabled),
        ns.is('checked', isChecked),
        ns.is('indeterminate', !isChecked && indeterminate),
        ns.is('focus', focus)
      ]"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
    >
      <span :class="ns.e('inner')"></span>
      <input
        type="checkbox"
        ref="inputRef"
        :checked="isChecked"
        :class="ns.e('original')"
        :tabindex="tabindex"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span ref="labelRef" v-if="$slots.default" :class="ns.e('label')">
      <slot> </slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import { shallowRef } from 'vue'
import { checkboxProps, checkboxEmit } from './checkbox'
import { useCheckbox } from './useCheckbox'

defineOptions({
  name: 'ElCheckbox'
})
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmit)

const ns = useNamespace('checkbox')

const inputRef = shallowRef()

const { isChecked, focus, isDisabled, checkboxSize, handleChange } =
  useCheckbox(props, emit)
</script>
