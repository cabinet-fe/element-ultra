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
    @mouseenter="handleMouseEnter"
    @click.stop="handleClick"
    :title="String(label)"
  >
    <slot :item="item" :index="index" :disabled="disabled">
      <span>{{ label }}</span>
    </slot>
  </li>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { OptionProps } from './defaults'
import { selectInjectionKey } from './token'
import { computed } from 'vue'

const props = defineProps(OptionProps)

const emit = defineEmits({
  select: (item: Record<string, any>, index: number) => true,
  hover: (value: any) => true
})

const ns = useNamespace('select')
const { getLabel } = inject(selectInjectionKey)!
const handleMouseEnter = () => {
  if (!props.disabled) {
    emit('hover', props.index)
  }
}
const handleClick = () => {
  if (props.disabled) return
  emit('select', props.item!, props.index!)
}
const label = computed(() => getLabel(props.item))
</script>
