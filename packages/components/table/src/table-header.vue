<template>
  <colgroup>
    <col
      v-for="column of columns"
      :key="column.key"
      :style="getColStyle(column)"
    />
  </colgroup>

  <tr :class="ns.e('header')">
    <template v-for="(columns, type) of columnLayouts">
      <th
        v-for="column of columns"
        :class="[
          headerCellClass,
          ns.em('header-cell', type),
          ns.is('last', column.typeLast),
          ns.is('first', column.typeFirst)
        ]"
        :style="getCellStyle(column, column.fixed)"
        :key="column.key"
      >
        <ElNodeRender :nodes="[column.name()]" />
      </th>
    </template>
  </tr>
</template>

<script lang="ts" setup>
import { CSSProperties, inject } from 'vue'
import { tableToken } from './token'
import { ElNodeRender } from '@element-ultra/components/node-render'
import type { TableColumn } from './table'

const { columnLayouts, columns, ns, getCellStyle } = inject(tableToken)!

const headerCellClass = ns.e('header-cell')

/** 如果没有指定width, 则给个minWidth */
const getColStyle = (column: TableColumn): CSSProperties => {
  return {
    width: column.width + 'px',
    minWidth: (column.minWidth ? column.minWidth : column.width ? column.width : 100) + 'px'
  }
}
</script>
