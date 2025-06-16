<template>
  <div style="width: 800px; padding: 4px 12px">
    <div style="border-bottom: 1px solid #ccc">
      <ElCheckbox
        :model-value="allChecked"
        @update:model-value="handleCheckAll"
      >
        全选
      </ElCheckbox>
    </div>

    <div
      style="
        display: grid;
        grid-template-columns: repeat(5, minmax(148px, 1fr));
        gap: 12px;
      "
    >
      <ElCheckbox
        v-for="column of flattedColumns"
        :disabled="column.key.includes('action')"
        :model-value="column.visible ?? true"
        @update:model-value="handleUpdateVisible(column, $event)"
      >
        {{ column.name }}
      </ElCheckbox>
    </div>

    <div style="text-align: right">
      <ElButton @click="execute(handleSave)" type="primary">保存</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, shallowRef, watch } from 'vue'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElButton } from '@element-ultra/components/button'
import { proTableColumnsKey, proTableKey } from './token'
import type { ProTableColumn } from './pro-table'

const emit = defineEmits(['close'])

// const { ns } = inject(proTableKey)!
const { flattedColumns, handleSave } = inject(proTableColumnsKey)!

const allChecked = shallowRef(false)

watch(
  flattedColumns,
  fc => {
    allChecked.value = fc.every(c => {
      return c.visible !== false
    })
  },
  {
    immediate: true
  }
)

function handleCheckAll(checked: any) {
  flattedColumns.value.forEach(column => {
    if (column.key.includes('action')) return
    column.visible = checked
  })
  allChecked.value = true
}

function handleUpdateVisible(column: ProTableColumn, visible: any) {
  column.visible = visible
}
function execute(fn: Function) {
  fn()
  emit('close')
}
</script>
