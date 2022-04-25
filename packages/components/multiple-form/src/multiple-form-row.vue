<template>
  <tr ref="el" @mouseenter="emit('mouseenter')">
    <td style="text-align: center">{{ rowIndex + 1 }}</td>

    <!-- 行内编辑 -->
    <template v-if="showInline">
      <td
        v-for="column of multipleFormProps.columns"
        :key="column.key"
        :style="{ textAlign: column.align }"
      >
        <RenderNodes :children="slots[column.key]?.({ row, index: rowIndex })" />
      </td>

      <td :class="ns.e('action')">
        <el-button type="primary" :icon="Select" text @click="emit('save')" />
        <el-button type="primary" :icon="Close" text @click="emit('exit-edit')" />
      </td>
    </template>

    <!-- 正常的行 -->
    <template v-else>
      <td
        v-for="column of multipleFormProps.columns"
        :key="column.key"
        :style="{ textAlign: column.align }"
      >
        {{ column.render?.(row[column.key], row, rowIndex) || row[column.key] }}
      </td>

      <td :class="ns.e('action')">
        <el-button type="primary" :icon="Edit" text @click="emit('edit')" />
        <el-button type="primary" :icon="Delete" text @click="emit('delete')" />
        <el-button
          type="primary"
          v-if="multipleFormProps.mode !== 'custom'"
          :icon="Plus"
          text
          @click="emit('create')"
        />
      </td>
    </template>
  </tr>
</template>

<script lang="ts" setup>
import { Select, Close, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { defineComponent, inject, shallowRef } from 'vue'
import ElButton from '@element-ultra/components/button'
import { multipleFormKey } from './token'

defineProps<{
  row: any
  rowIndex: number
  showInline: boolean
}>()

const { multipleFormProps, ns, slots } = inject(multipleFormKey)!

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'exit-edit'): void
  (e: 'create'): void
  (e: 'delete'): void
  (e: 'edit'): void
  (e: 'mouseenter'): void
}>()

const el = shallowRef<HTMLTableRowElement>()

const RenderNodes = defineComponent({
  props: { children: { type: Array } },
  setup(props) {
    return () => props.children
  }
})

defineExpose({ el })
</script>
