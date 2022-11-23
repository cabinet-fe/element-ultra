<template>
  <tr :class="ns.e('row')">
    <template v-for="(columns, key) in columnLayouts">
      <td
        v-for="(column, index) of columns"
        :class="[rowCellClass, ns.em('row-cell', column.fixed)]"
        :key="key + '-' + column.key"
        :style="getCellStyle(column)"
      >
        <ElNodeRender :nodes="getNodes(column, index)" />
      </td>
    </template>
  </tr>
</template>

<script lang="ts" setup>
import { inject, PropType } from 'vue'
import { tableToken } from './token'
import { ElNodeRender } from '@element-ultra/components/node-render'
import type { TableRow, TableColumn } from './table'
import { getChainValue } from '@element-ultra/utils'

const props = defineProps({
  row: {
    type: Object as PropType<TableRow>,
    required: true
  }
})

const { ns, columnLayouts, getCellStyle } = inject(tableToken)!

const rowCellClass = ns.e('row-cell')

const getNodes = (column: TableColumn, index: number) => {
  const { row } = props
  const val = getChainValue(row.data, column.key)
  const content = column.render!({
    val,
    v: val,
    index,
    row: row.data,
    wrap: row
  })
  return [content]
}
</script>
