<template>
  <div :class="ns.e('header-wrap')">
    <table :class="ns.e('header')">
      <tr v-for="(row, rowIndex) of headerRows">
        <th
          v-for="column of row"
          :rowspan="getCellRowspan(column, rowIndex)"
          :colspan="getCellColspan(column)"
          :class="cellClass"
          :key="column.data.key"
          :style="getCellStyle(column)"
        >
          {{ column.data.name }}
        </th>
      </tr>
    </table>
  </div>
</template>

<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { computed, inject } from 'vue'
import { dataTableToken } from './token'
import type { TreeNode } from './utils'

const ns = useNamespace('data-table')
const cellClass = ns.e('header-cell')

const { headerRows } = inject(dataTableToken)!

const headerRowLen = computed(() => {
  return headerRows.value.length
})

/**
 * 单元格没有子元素才会进行行合并
 */
const getCellRowspan = (column: TreeNode, rowIndex: number) => {
  return column.children?.length ? undefined : headerRowLen.value - rowIndex
}

const getCellColspan = (column: TreeNode) => {
  return column.size || undefined
}

const getCellStyle = (column: TreeNode) => {
  return column.isLeaf
    ? {
        'border-top': column.depth === 0 ? '1px solid #eee' : undefined ,
        width: (column.data.width || 100) + 'px',
        minWidth: (column.data.minWidth || 100) + 'px'
      }
    : undefined
}
</script>
