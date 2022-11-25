<template>
  <tr :class="[ns.e('row'), rootProps.rowClass]">
    <template v-for="(columns, type) of columnLayouts">
      <td
        v-for="(column, index) of columns"
        :class="[
          rowCellClass,
          ns.em('row-cell', type),
          ns.is('last', column.typeLast),
          ns.is('first', column.typeFirst)
        ]"
        :key="type + '-' + column.key"
        :style="getCellStyle(column, column.fixed)"
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

const { ns, columnLayouts, rootProps, getCellStyle } = inject(tableToken)!

const rowCellClass = ns.e('row-cell')

const getNodes = (column: TableColumn, index: number) => {
  const { row } = props
  const val = getChainValue(row, column.key)
  const content = column.render!({
    val,
    v: val,
    index,
    row
  })
  return [content]
}
</script>
