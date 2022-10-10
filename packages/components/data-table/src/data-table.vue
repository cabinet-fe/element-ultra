<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is('left-fixed-shadow')]: showLeftFixedShadow,
      [ns.is('right-fixed-shadow')]: showRightFixedShadow
    }"
    :style="{ height }"
  >
    <!-- 表头 -->
    <DataTableHeader />

    <!-- 表体 -->
    <DataTableBody />

    <!-- 合计行. 树形结构显示不能显示合计行 -->
    <DataTableFooter v-if="showSummary && !tree" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import DataTableHeader from './data-table-header.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { dataTableProps, dataTableEmits } from './data-table'
import { dataTableToken } from './token'
import useColumns from './hooks/use-columns'
import useStyle from './hooks/use-style'
import useState from './hooks/use-state'

defineOptions({
  name: 'ElDataTable'
})

const ns = useNamespace('data-table')

const props = defineProps(dataTableProps)
const emit = defineEmits(dataTableEmits)

const state = useState(props, emit)
const columns = useColumns(props, state)
const styles = useStyle(props)

const { showLeftFixedShadow, showRightFixedShadow } = styles

provide(dataTableToken, {
  ...state,
  ...columns,
  ...styles,
  ns,
  rootProps: props,
  emit
})

defineExpose({
  getColumns: columns.getColumns
})
</script>
