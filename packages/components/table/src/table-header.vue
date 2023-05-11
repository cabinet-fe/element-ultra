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
import { computed, CSSProperties, inject } from 'vue'
import { tableToken } from './token'
import { ElNodeRender } from 'components/node-render'
import type { TableColumn } from './table'

const { columnLayouts, columns, containerWidth, ns, getCellStyle } =
  inject(tableToken)!

const headerCellClass = ns.e('header-cell')

/** 剩余的平均宽度 */
const restAverageWidth = computed(() => {
  const columnTotalWidth = columns.value.reduce((acc, cur) => {
    if (cur.width) {
      if (cur.minWidth && cur.minWidth > cur.width) {
        acc += cur.minWidth
      } else {
        acc += cur.width
      }
    } else {
      if (cur.minWidth) {
        acc += cur.minWidth
      }
    }

    return acc
  }, 0)

  const restNum = columns.value.filter(column => !column.width).length

  return (containerWidth.value - columnTotalWidth) / restNum
})

const getColStyle = (column: TableColumn): CSSProperties => {
  const style: CSSProperties = {}

  if (column.width) {
    style.width = `${column.width}px`
  }
  if (column.minWidth) {
    if (restAverageWidth.value > 0) {
      style.width = `${column.minWidth + restAverageWidth.value}px`
    } else {
      style.width = `${column.minWidth}px`
    }
  }
  return style
}
</script>
