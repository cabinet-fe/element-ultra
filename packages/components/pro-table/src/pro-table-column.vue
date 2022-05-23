<template>
  <!-- 没有子级 -->
  <el-table-column
    v-if="!column.children?.length"
    v-bind="inheritColumns"
    :prop="column.key"
    :formatter="column.render"
    :name="label"
  >
    <template #header v-if="headerRender">
      <ChildRenderer :child="headerRender()" />
    </template>

    <template #default="scope" v-if="column.slot">
      <ElSlotsRender :nodes="proTableSlots[column.slot!]?.(scope) || []" />
    </template>
  </el-table-column>

  <!-- 有子级 -->
  <el-table-column
    v-else
    v-bind="inheritColumns"
    :prop="column.key"
    :formatter="column.render"
    :name="label"
  >
    <template #header v-if="headerRender">
      <ChildRenderer :child="headerRender()" />
    </template>

    <pro-table-column
      v-for="childColumn of column.children"
      :key="childColumn.key"
      :column="childColumn"
    />
  </el-table-column>
</template>

<script lang="ts" setup>
import {
  computed,
  type PropType,
  defineComponent,
  type VNode,
  inject
} from 'vue'
import { ElTableColumn } from '@element-ultra/components/table'
import { ElSlotsRender } from '@element-ultra/components/slots-render'
import type { ProTableColumn } from './pro-table'
import { omit } from 'lodash'
import { proTableKey } from './token'

defineOptions({
  name: 'ProTableColumn'
})

const props = defineProps({
  column: {
    type: Object as PropType<ProTableColumn>,
    required: true
  }
})

const { proTableSlots } = inject(proTableKey)!

let inheritColumns = computed(() => {
  return omit(props.column, ['key', 'render', 'name', 'children'])
})

const label = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? name : undefined
})

const headerRender = computed(() => {
  const { name } = props.column
  return typeof name === 'string' ? undefined : name
})

const ChildRenderer = defineComponent({
  props: {
    child: [Object, String, Number, Boolean] as PropType<
      VNode | string | number | boolean
    >
  },

  setup(props) {
    return () => props.child
  }
})
</script>
