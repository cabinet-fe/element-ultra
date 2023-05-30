<template>
  <span :class="ns.e('jump')" :disabled="disabled">
    前往
    <el-input-number
      size="small"
      :class="[ns.e('editor'), ns.is('in-pagination')]"
      :min="1"
      :max="pageCount"
      :disabled="disabled"
      :model-value="innerValue"
      @update:model-value="handleInput"
      @change="handleChange"
    />
    页
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import ElInputNumber from '@element-ultra/components/input-number'
import { usePagination } from '../usePagination'

defineOptions({
  name: 'ElPaginationJumper'
})

const ns = useNamespace('pagination')
const { pageCount, disabled, currentPage, changeEvent } = usePagination()
const userInput = ref<number>()
const innerValue = computed(() => userInput.value ?? currentPage?.value)

function handleInput(val?: number) {
  userInput.value = val ?? 1
}

function handleChange(val?: number) {
  val = Math.trunc(+(val ?? 1))
  changeEvent?.(+val)
  userInput.value = undefined
}
</script>
