<template>
  <div :class="ns.b()">
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>

    <DataTableHeader />

    <DataTableBody />

    <DataTableFooter />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import DataTableHeader from './data-table-header.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { dataTableProps } from './data-table'
import { provide } from 'vue'
import { dataTableToken } from './token'
import { useColumns } from './hooks/useColumns'

defineOptions({
  name: 'ElDataTable',
})

const ns = useNamespace('data-table')
const props = defineProps(dataTableProps)

const result = useColumns(props)

// 依赖提供
provide(dataTableToken, {
  ...result,
  rootProps: props
})
</script>
