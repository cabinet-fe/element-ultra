<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})

const dom = ref<HTMLDivElement | null>(null)
const intoView = () => {
  dom.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}
defineExpose({
  intoView,
})
</script>

<template>
  <div class="example-source language-vue" ref="dom" v-html="decoded"></div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
  overflow-y: auto !important;
}
</style>
