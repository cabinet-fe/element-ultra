<template>
  <tbody :class="ns.e('body')">
    <TableBodyRow v-for="row of rows" :key="row.id" :row="row" />
  </tbody>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import TableBodyRow from './table-body-row.vue'
import { tableToken } from './token'
import type { TableRow } from './table'

const { rootProps, ns } = inject(tableToken)!

let id = 0

const wrapRow = (data: any): TableRow => {
  const { childrenKey, tree } = rootProps

  const row: TableRow = {
    data,
    leaf: true,
    expanded: false,
    id: id++
  }

  if (!tree) return row

  const children = data[childrenKey] as any[]

  if (children?.length) {
    row.children = children.map(wrapRow)
  }

  return row
}

const rows = computed(() => {
  return rootProps.data.map(wrapRow)
})
</script>
