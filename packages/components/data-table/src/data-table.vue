<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is('left-fixed-shadow')]: showLeftFixedShadow,
      [ns.is('right-fixed-shadow')]: showRightFixedShadow
    }"
  >
    <DataTableHeader />
    <DataTableBody />
    <DataTableFooter v-if="showSummary" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import DataTableHeader from './data-table-header.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { dataTableProps } from './data-table'
import { dataTableToken } from './token'
import useColumns from './hooks/use-columns'
import useStyle from './hooks/use-style'
import useState from './hooks/use-state'

defineOptions({
  name: 'ElDataTable'
})

const ns = useNamespace('data-table')

const props = defineProps(dataTableProps)

const state = useState(props)

const styles = useStyle(props)

const { showLeftFixedShadow, showRightFixedShadow } = styles

// 依赖提供
provide(dataTableToken, {
  state,
  ...useColumns(props, state),
  ...styles,
  ns,
  rootProps: props
})
</script>
