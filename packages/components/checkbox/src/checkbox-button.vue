<template>
  <label
    :class="[
      ns.b('button'),
      ns.bm('button', checkboxSize),
      ns.is('disabled', isDisabled),
      ns.is('checked', isChecked),
      ns.is('focus', focus)
    ]"
    role="checkbox"
  >
    <input
      :checked="isChecked"
      :class="ns.be('button', 'original')"
      type="checkbox"
      :tabindex="tabindex"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />

    <span v-if="$slots.default || value" :class="ns.be('button', 'inner')">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>
<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import { useCheckbox } from './useCheckbox'
import { checkboxEmit, checkboxProps } from './checkbox'

defineOptions({
  name: 'ElCheckboxButton'
})
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmit)

const { focus, isChecked, isDisabled, checkboxSize, handleChange } = useCheckbox(props, emit)

const ns = useNamespace('checkbox')
</script>
