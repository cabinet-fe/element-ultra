<template>
  <component :is="props.tag" :class="[ns.b(), $attrs.class]" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { gridProps } from './grid'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@element-ultra/hooks'

defineOptions({
  name: 'ElGrid'
})

const ns = useNamespace('grid')

const props = defineProps(gridProps)

const style = computed(() => {
  const { cols } = props
  const gridTemplateColumns = typeof cols === 'number' ? `repeat(${cols}, 1fr)` : cols.join(' ')
  const result: CSSProperties = {
    gridTemplateColumns,
    gap: props.gap
      .split(',')
      .map((s) => `${s}px`)
      .join(' ')
  }
  return result
})
</script>
