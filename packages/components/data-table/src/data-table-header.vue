<template>
  <div :class="ns.e('header-wrap')" ref="headerRef">
    <table :class="ns.e('header')">
      <thead>
        <tr v-for="(row, rowIndex) of headerRows">
          <template v-if="rowIndex === 0">
            <th
              v-for="column of extraColumns"
              :key="column.key"
              :rowspan="headerRows.length"
              :style="getExtraCellStyle(column)"
              :class="cellClass"
            >
              <ElSlotsRender
                :nodes="[
                  typeof column.name === 'function'
                    ? column.name()
                    : column.name
                ]"
              />
            </th>
          </template>

          <th
            v-for="header of row"
            :rowspan="getCellRowspan(header, rowIndex)"
            :colspan="getCellColspan(header)"
            :key="header.data.key"
            :class="cellClass"
            :style="getHeaderCellStyle(header)"
          >
            <ElSlotsRender
              :nodes="[
                typeof header.data.name === 'function'
                  ? header.data.name()
                  : header.data.name
              ]"
            />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<script lang="ts" setup>
import ElSlotsRender from '@element-ultra/components/slots-render'
import { useNamespace } from '@element-ultra/hooks'
import { computed, inject, shallowRef, watch } from 'vue'
import { dataTableToken } from './token'
import type { TableHeader } from './utils'

const ns = useNamespace('data-table')
const cellClass = ns.e('header-cell')

const {
  headerRows,
  scrollLeft,
  extraColumns,
  getHeaderCellStyle,
  getExtraCellStyle
} = inject(dataTableToken)!

const headerRowLen = computed(() => {
  return headerRows.value.length
})

/**
 * 单元格没有子元素才会进行行合并
 */
const getCellRowspan = (column: TableHeader, rowIndex: number) => {
  return column.children?.length ? undefined : headerRowLen.value - rowIndex
}

const getCellColspan = (column: TableHeader) => {
  return column.size || undefined
}

const headerRef = shallowRef<HTMLDivElement>()

watch(scrollLeft, left => {
  headerRef.value!.scrollLeft = left
})
</script>
