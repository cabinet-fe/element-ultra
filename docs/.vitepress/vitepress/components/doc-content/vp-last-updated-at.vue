<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

const prefix = '最后更新'

const datetime = ref('')
onMounted(() => {
  const { lastUpdated } = page.value
  datetime.value = (
    lastUpdated ? new Date(lastUpdated) : new Date()
  ).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })
})
</script>

<template>
  <p class="last-updated text-sm">
    <span class="prefix">{{ prefix }}:</span>
    <span class="datetime">{{ datetime }}</span>
  </p>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;

.last-updated {
  display: inline-block;
  margin: 0;
  line-height: 1.4;
  color: var(--text-color-light);

  .prefix {
    display: inline-block;
    font-weight: 500;
  }

  .datetime {
    display: inline-block;
    margin-left: 6px;
    font-weight: 400;
  }
}
</style>
