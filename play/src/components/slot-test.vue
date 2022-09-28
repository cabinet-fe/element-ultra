<template>
 <TestA><slot name="test" /></TestA>
</template>

<script lang="ts" setup>
import { defineComponent, useSlots } from 'vue'

const TestA = defineComponent({
  setup() {
    const slots = useSlots()
    return () => {
      console.log(11)
      return slots.default?.()
    }
  }
})
</script>