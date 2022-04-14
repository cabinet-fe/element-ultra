<template>
  <component :is="component">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { Component, PropType } from 'vue'

defineOptions({
  name: 'ElGridItem'
})

const props = defineProps({
  component: {
    type: [Array, Object] as PropType<Component>
  }
})
</script>
