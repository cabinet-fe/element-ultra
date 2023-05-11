<template>
  <span :class="ns.e('total')" :disabled="disabled"> 共 {{ total }} 条 </span>
</template>

<script setup lang="ts">
import { useNamespace } from 'hooks'
import { usePagination } from '../usePagination'

defineOptions({
  name: 'ElPaginationTotal'
})

defineProps({
  total: {
    type: Number,
    default: 1000
  }
})

const ns = useNamespace('pagination')
const { disabled } = usePagination()
</script>
