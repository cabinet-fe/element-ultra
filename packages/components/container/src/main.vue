<template>
  <main :class="ns.b()">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@element-ultra/hooks'

export default defineComponent({
  name: 'ElMain',
  setup() {
    const ns = useNamespace('main')

    return {
      ns,
    }
  },
})
</script>
