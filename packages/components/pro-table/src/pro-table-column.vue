<template>
  <el-table-column
    :width="column.width"
    :prop="column.key"
    :fixed="column.fixed"
    :formatter="column.render"
    :name="label"
    v-if="!column.children || !column.children.length"
  >
    <template #header v-if="headerRender">
      {{headerRender!()}}
    </template>
  </el-table-column>

  <el-table-column
    :width="column.width"
    :prop="column.key"
    :fixed="column.fixed"
    :formatter="column.render"
    :name="label"
    v-else
  >
    <template #header v-if="headerRender">
      {{headerRender!()}}
    </template>

    <pro-table-column
      v-for="childColumn of column.children"
      :key="childColumn.key"
      :column="childColumn"
    />
  </el-table-column>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { ElTableColumn } from '@element-ultra/components/table'
import type { ProTableColumn } from './pro-table'

defineOptions({
  name: 'ProTableColumn',
})

const label = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? name : undefined
})

const headerRender = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? undefined : name
})

const props = defineProps({
  column: {
    type: Object as PropType<ProTableColumn>,
    required: true,
  },
})
</script>
