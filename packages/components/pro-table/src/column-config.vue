<template>
  <div :class="ns.e('columns-config')">
    <div :class="ns.e('columns-config-title')">表格列配置</div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
      "
    >
      <div :class="ns.e('columns-config-name')"></div>
      <ElCheckbox
        :model-value="allChecked"
        @update:model-value="handleCheckAll($event)"
        style="margin-right: 0"
      />
      <div style="width: 80px"></div>
      <div style="width: 102px"></div>
      <div style="width: 100px"></div>
    </div>
    <ElScrollbar :class="ns.e('columns-config-content')">
      <div
        v-for="column in flattedColumns"
        :key="column.key"
        :class="ns.e('columns-config-item')"
      >
        <span
          :class="ns.e('columns-config-name')"
          :style="{ paddingLeft: `${(column.depth ?? 0) * 14}px` }"
        >
          {{ column.name }}</span
        >
        <ElCheckbox
          :disabled="column.key.includes('action')"
          :model-value="column.visible ?? true"
          @update:model-value="handleUpdateVisible(column, $event)"
          style="margin-right: 0"
        />

        <div style="width: 80px; text-align: center">
          <ElButtonGroup size="small" v-if="showFixed(column)">
            <ElButton
              :icon="ArrowLeft"
              :disabled="!!column.children?.length"
              title="固定在左侧"
              :type="column.fixed === 'left' ? 'primary' : 'default'"
              @click="
                column.fixed = column.fixed !== 'left' ? 'left' : undefined
              "
            />
            <ElButton
              :icon="ArrowRight"
              :disabled="!!column.children?.length"
              title="固定在右侧"
              :type="column.fixed === 'right' ? 'primary' : 'default'"
              @click="
                column.fixed = column.fixed !== 'right' ? 'right' : undefined
              "
            />
          </ElButtonGroup>
        </div>

        <ElSelect
          v-model="column.align"
          :options="alignOptions"
          size="small"
          placeholder="对齐方式"
          style="width: 102px"
        />

        <div style="width: 100px">
          <ElInputNumber
            v-if="showWidth(column)"
            v-model="column.width"
            size="small"
            placeholder="列宽"
            controls
            :step="10"
            :min="80"
          />
        </div>
      </div>
    </ElScrollbar>

    <div :class="ns.e('columns-config-footer')">
      <ElButton @click="execute(handleReset)">重置</ElButton>
      <ElButton type="primary" @click="execute(handleSave)">保存</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { proTableColumnsKey, proTableKey } from './token'
import { ElButton, ElButtonGroup } from '@element-ultra/components/button'
import type { ProTableColumn } from './pro-table'
import { ArrowLeft, ArrowRight } from 'icon-ultra'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElSelect } from '@element-ultra/components/select'
import { ElInputNumber } from '@element-ultra/components/input-number'
import { ElScrollbar } from '@element-ultra/components/scrollbar'

const emit = defineEmits(['close'])

const { ns } = inject(proTableKey)!
const { flattedColumns, handleSave, handleReset } = inject(proTableColumnsKey)!

const allChecked = ref(false)
watch(
  flattedColumns,
  fc => {
    allChecked.value = fc.every(c => c.visible !== false)
  },
  { immediate: true }
)

function handleCheckAll(checked: any) {
  flattedColumns.value.forEach(column => {
    if (column.key.includes('action')) return
    column.visible = checked
  })
  allChecked.value = checked
}

function handleUpdateVisible(column: ProTableColumn, visible: any) {
  column.visible = visible
}

const alignOptions = [
  { label: '左对齐', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右对齐', value: 'right' }
]

function showFixed(column: ProTableColumn) {
  return !column.children?.length && !column.depth
}

function showWidth(column: ProTableColumn) {
  return !column.children?.length
}

function execute(fn: Function) {
  fn()
  emit('close')
}
</script>
