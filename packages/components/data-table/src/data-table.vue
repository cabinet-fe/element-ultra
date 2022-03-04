<template>
  <div :class="ns.b()">
    <DataTableHeader />
    <DataTableBody />
    <DataTableFooter />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@element-pro/hooks'
import DataTableHeader from './data-table-header.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { dataTableProps } from './data-table'
import { provide, toRefs } from 'vue'
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
  ...toRefs(props)
})
</script>
