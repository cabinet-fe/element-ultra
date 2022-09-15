<template>
  <div
    :class="[ns.e('header-wrap'), ns.is('resizing', resizing)]"
    ref="headerRef"
  >
    <table :class="ns.e('header')">
      <thead>
        <tr v-for="(row, rowIndex) of headerRows">
          <th
            v-for="header of row"
            :rowspan="getCellRowspan(header, rowIndex)"
            :colspan="getCellColspan(header)"
            :key="header.data.key"
            :class="{
              [cellClass]: true,
              'is-left': header.data.fixed === 'left',
              'is-right': header.data.fixed === 'right',
              'is-leaf': header.isLeaf
            }"
            :style="getHeaderCellStyle(header)"
          >
            <span
              v-if="header.isLeaf"
              :class="[ns.e('column-resize')]"
              style="right: 0"
              @mousedown="handleResizeMousedown($event, header)"
            ></span>

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

const { headerRows, scrollLeft, getHeaderCellStyle } = inject(dataTableToken)!

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

const resizing = shallowRef(false)

let startX = 0

const handleResizeMousedown = (e: MouseEvent, header: TableHeader) => {
  resizing.value = true
  startX = e.pageX

  document.addEventListener('mousemove', resizeMousemoveHandler)
  document.addEventListener('mouseup', resizeMouseupHandler)
}
const resizeMouseupHandler = () => {
  resizing.value = false
  document.removeEventListener('mousemove', resizeMousemoveHandler)
  document.removeEventListener('mouseup', resizeMouseupHandler)
}
const resizeMousemoveHandler = (e: MouseEvent) => {
  console.log(e.pageX - startX)
}

const headerRef = shallowRef<HTMLDivElement>()

watch(scrollLeft, left => {
  headerRef.value!.scrollLeft = left
})
</script>
