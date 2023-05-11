<template>
  <li
    :style="style"
    :class="[
      ns.be('dropdown', 'option-item'),
      ns.is('selected', selected),
      ns.is('disabled', disabled),
      ns.is('created', created),
      { hover: hovering }
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot :item="item" :index="index" :disabled="disabled">
      <span>{{ getLabel(item) }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useNamespace } from 'hooks'
import { useOption } from './useOption'
import { OptionProps } from './defaults'
import { selectInjectionKey } from './token'

export default defineComponent({
  props: OptionProps,
  emits: ['select', 'hover'],
  setup(props, { emit }) {
    const ns = useNamespace('select')
    const { getLabel } = inject(selectInjectionKey)!
    const { hoverItem, selectOptionClick } = useOption(props, { emit })
    return {
      ns,
      hoverItem,
      selectOptionClick,
      getLabel
    }
  }
})
</script>
