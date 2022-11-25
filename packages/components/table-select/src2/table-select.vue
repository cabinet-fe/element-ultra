<template>
  <!-- 触发器 -->
  <span @click="dialogRef?.open()" :class="ns.e('btn')">
    <slot :class="ns.e('trigger')">
      <el-button type="primary">选择</el-button>
    </slot>
  </span>

  <!-- 展示数据表格 -->
  <ElTable :size="props.size" :columns="props.columns" :data="displayData" />

  <TableSelectDialog ref="dialogRef">
    <template #searcher>
      <slot name="searcher" />
    </template>
  </TableSelectDialog>
</template>

<script lang="ts" setup>
import { tableSelectEmits, tableSelectProps } from './table-select'
import { ElTable } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { computed, provide, shallowRef } from 'vue'
import { tableSelectToken } from './token'
import { useNamespace } from '@element-ultra/hooks'
import TableSelectDialog from './table-select-dialog.vue'

const props = defineProps(tableSelectProps)

const emit = defineEmits(tableSelectEmits)

const ns = useNamespace('table-select')

const displayData = computed(() => {
  const { modelValue } = props
  if (!modelValue) return []
  return Array.isArray(modelValue) ? modelValue : [modelValue]
})

const dialogRef = shallowRef<InstanceType<typeof TableSelectDialog>>()

provide(tableSelectToken, {
  rootProps: props,
  ns,
  rootEmit: emit
})

defineExpose({
  open() {
    dialogRef.value?.open()
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
