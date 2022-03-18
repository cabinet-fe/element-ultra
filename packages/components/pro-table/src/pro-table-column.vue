<template>
  <el-table-column
    v-if="!column.children || !column.children.length"
    v-bind="inheritColumns"
    :prop="column.key"
    :formatter="column.render"
    :name="label"
  >
    <template #header v-if="headerRender">
      {{headerRender!()}}
    </template>

    <template #default="scope" v-if="$slots.default">
      <slot v-bind="scope" />
    </template>
  </el-table-column>

  <el-table-column
    v-else
    v-bind="inheritColumns"
    :prop="column.key"
    :formatter="column.render"
    :name="label"
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
import { omit } from 'lodash'

defineOptions({
  name: 'ProTableColumn',
})

const props = defineProps({
  column: {
    type: Object as PropType<ProTableColumn>,
    required: true,
  },
})

let inheritColumns = computed(() => {
  return omit(props.column, ['key', 'render', 'name'])
})

const label = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? name : undefined
})

const headerRender = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? undefined : name
})
</script>
