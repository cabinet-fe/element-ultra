<template>
  <div v-if="item.isTitle" :class="ns.be('group', 'title')" :style="styles">
    {{ item.label }}
  </div>
  <div v-else :class="ns.be('group', 'split')" :style="style">
    <span
      :class="ns.be('group', 'split-dash')"
      :style="{ top: height ? `${height / 2}px` : undefined }"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import type { CSSProperties, PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  style: Object as PropType<CSSProperties>,
  height: Number
})

const styles = computed(() => {
  const { style, height } = props
  return {
    ...style,
    lineHeight: `${height}px`
  }
})

const ns = useNamespace('select')
</script>
