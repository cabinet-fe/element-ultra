<template>
  <component :is="props.tag" :class="[ns.b(), $attrs.class]" :style="style">
    <component v-for="item of getSlots()" :is="item" />
  </component>
</template>

<script setup lang="ts">
import { computed, cloneVNode, useSlots } from 'vue'
import { gridProps } from './grid'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@element-ultra/hooks'

defineOptions({
  name: 'ElGrid'
})

// 布局
// grid-template-columns: repeat(times, value)
// times number | auto-fill
// value px fr

const ns = useNamespace('grid')

const props = defineProps(gridProps)

const style = computed(() => {
  const { cols } = props
  const gridTemplateColumns =  typeof cols === 'number' ? `repeat(${cols}, 1fr)` : cols.join(' ')
  const result: CSSProperties = {
    gridTemplateColumns,
    gap: props.gap
      .split(',')
      .map((s) => `${s}px`)
      .join(' ')
  }
  return result
})

const slots = useSlots()
const getSlots = () => {
  const defaultSlots = slots.default?.() || []
  return defaultSlots.map((node) => {
    const ret = cloneVNode(node, {
      style: {
        // gridColumn: 'span 2'
      }
    })
    return ret
  })
}
</script>
