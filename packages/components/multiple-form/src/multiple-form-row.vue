<template>
  <tr ref="el" @mouseenter="emit('mouseenter')">
    <td style="text-align: center">{{ rowIndex + 1 }}</td>

    <!-- 行内编辑 -->
    <template v-if="showInline">
      <td
        v-for="column of visibleColumns"
        :key="column.key"
        :style="{ textAlign: column.align }"
      >
        <!-- 插槽穿透 -->
        <ElSlotsRender :nodes="slots[column.key]?.({ row, index: rowIndex })" />
      </td>

      <td :class="ns.e('action')" v-if="!multipleFormProps.disabled">
        <el-button type="primary" :icon="Select" link @click="emit('save')" />
        <el-button
          type="primary"
          :icon="Close"
          link
          @click="emit('exit-edit')"
        />
      </td>
    </template>

    <!-- 列表查看 -->
    <template v-else>
      <td
        v-for="column of visibleColumns"
        :key="column.key"
        :style="{ textAlign: column.align }"
      >
        <!-- 插槽穿透 -->
        <!-- 查看模式 -->
        <ElSlotsRender
          v-if="slots[column.key + ':view']"
          :nodes="slots[column.key + ':view']?.({ row, index: rowIndex })"
        />

        <!-- 默认模式 -->
        <template v-else>
          {{
            column.render?.(row[column.key], row, rowIndex) || row[column.key]
          }}
        </template>
      </td>

      <td :class="ns.e('action')" v-if="!multipleFormProps.disabled">
        <el-button
          type="primary"
          v-if="multipleFormProps.actionEdit"
          :icon="Edit"
          link
          @click="emit('edit')"
        />
        <el-button
          type="primary"
          v-if="multipleFormProps.actionDelete"
          :icon="Delete"
          link
          @click="emit('delete')"
        />
        <el-button
          type="primary"
          v-if="
            multipleFormProps.actionCreate &&
            multipleFormProps.mode !== 'custom'
          "
          :icon="Plus"
          link
          @click="emit('create')"
        />
      </td>
    </template>
  </tr>
</template>

<script lang="ts" setup>
import { Select, Close, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { inject, shallowRef } from 'vue'
import ElButton from '@element-ultra/components/button'
import ElSlotsRender from '@element-ultra/components/slots-render'
import { multipleFormKey } from './token'

defineProps<{
  row: any
  rowIndex: number
  showInline: boolean
}>()

const { multipleFormProps, ns, slots, visibleColumns } =
  inject(multipleFormKey)!

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'exit-edit'): void
  (e: 'create'): void
  (e: 'delete'): void
  (e: 'edit'): void
  (e: 'mouseenter'): void
}>()

const el = shallowRef<HTMLTableRowElement>()

defineExpose({ el })
</script>
