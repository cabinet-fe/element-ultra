<template>
  <component :style="style" :is="component">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject, type Component, type PropType } from 'vue'
import type { ResponsiveCols } from './grid'
import { gridInjectionKey } from './token'

defineOptions({
  name: 'ElGridItem'
})

const { point } = inject(gridInjectionKey)!

const props = defineProps({
  component: {
    type: [Array, Object] as PropType<Component>
  },

  span: {
    type: [String, Object, Number] as PropType<'max' | Omit<ResponsiveCols, 'cols'> | number>
  }
})

const getSpan = (span?: 'max' | Omit<ResponsiveCols, 'cols'> | number) => {
  if (!span) return ''

  if (span === 'max') {
    return '1 / -1'
  } else if (!isNaN(+span)) {
    return `span ${span}`
  } else {
    return ''
  }
}

const style = computed(() => {
  return {
    gridColumn: getSpan(props.span)
  }
})


</script>
