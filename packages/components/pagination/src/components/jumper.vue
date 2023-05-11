<template>
  <span :class="ns.e('jump')" :disabled="disabled">
    前往
    <el-input
      size="small"
      :class="[ns.e('editor'), ns.is('in-pagination')]"
      :min="1"
      :max="pageCount"
      :disabled="disabled"
      :model-value="innerValue"
      type="number"
      @update:model-value="handleInput"
      @change="handleChange"
    />
    页
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from 'hooks'
import ElInput from 'components/input'
import { usePagination } from '../usePagination'

defineOptions({
  name: 'ElPaginationJumper'
})

const ns = useNamespace('pagination')
const { pageCount, disabled, currentPage, changeEvent } = usePagination()
const userInput = ref<number>()
const innerValue = computed(() => userInput.value ?? currentPage?.value)

function handleInput(val: number | string) {
  userInput.value = +val
}

function handleChange(val: number | string) {
  val = Math.trunc(+val)
  changeEvent?.(+val)
  userInput.value = undefined
}
</script>
