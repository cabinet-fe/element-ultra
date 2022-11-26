<template>
  <tbody :class="ns.e('body')">
    <TableBodyRow
      v-for="(row, index) of rootProps.data"
      :key="rootProps.rowKey ? row[rootProps.rowKey] : index"
      :row="row"
      :row-index="index"
      @click="rootEmit('row-click', { row, index })"
    />

    <tr v-if="!rootProps.data?.length" :class="ns.e('empty')">
      <td :colspan="columns.length" :class="ns.e('empty-cell')">
        <span :class="ns.e('empty-text')">{{ rootProps.emptyText }}</span>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import TableBodyRow from './table-body-row.vue'
import { tableToken } from './token'

const { rootProps, columns, rootEmit, ns } = inject(tableToken)!
</script>
