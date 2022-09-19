<template>
  <div
    :class="[ns.e('header-wrap'), ns.is('resizing', resizing)]"
    ref="headerRef"
  >
    <table :class="ns.e('header')">
      <!-- 组 -->
      <colgroup :class="ns.e('header-group')">
        <template v-for="item in leafColumns">
          <col
            v-for="column of item"
            :key="column.key"
            :style="getCellStyle(column)"
          />
        </template>
      </colgroup>

      <!-- 分组的表头, 因此会有多行 -->
      <thead>
        <tr v-for="(row, rowIndex) of headerRows">
          <th
            v-for="header of row"
            :rowspan="getCellRowspan(header, rowIndex)"
            :colspan="getCellColspan(header)"
            :key="header.data.key"
            :class="{
              [cellClass]: true,
              [cellLeftClass]: header.data.fixed === 'left',
              [cellCenterClass]: !header.data.fixed,
              [cellRightClass]: header.data.fixed === 'right',
              'is-leaf': header.isLeaf
            }"
            :style="{
              'text-align': header.data.align,
              left: header.data.left + 'px',
              right: header.data.right + 'px'
            }"
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
import { throttle } from 'lodash'
import { computed, inject, shallowRef, watch } from 'vue'
import { dataTableToken } from './token'
import type { TableHeader } from './utils'

const {
  headerRows,
  scrollLeft,
  updateFixedColumnsShadow,
  leafColumns,
  ns,
  getCellStyle,
  emit
} = inject(dataTableToken)!

const cellClass = ns.e('header-cell')
const cellLeftClass = ns.em('header-cell', 'left')
const cellCenterClass = ns.em('header-cell', 'center')
const cellRightClass = ns.em('header-cell', 'right')

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
let currentColIndex = -1
let currentNodeOriginWidth = 0
let currentNode: HTMLElement | null = null

let headerCols: NodeListOf<HTMLElement> | null = null
let bodyCols: NodeListOf<HTMLElement> | null = null
let footerCols: NodeListOf<HTMLElement> | null = null

/** 重置为初始状态 */
const resetResizeState = () => {
  startX = 0
  currentColIndex = -1
  currentNodeOriginWidth = 0
  currentNode = null
  headerCols = null
  bodyCols = null
  footerCols = null
}

const handleResizeMousedown = (e: MouseEvent, header: TableHeader) => {
  resizing.value = true
  startX = e.pageX

  currentColIndex = header.data.index!
  currentNode = (e.target as HTMLSpanElement).parentElement
  currentNodeOriginWidth = currentNode!.offsetWidth

  headerCols = document.querySelectorAll('.el-data-table__header col')
  bodyCols = document.querySelectorAll('.el-data-table__body col')
  footerCols = document.querySelectorAll('.el-data-table__footer col')

  document.addEventListener('mousemove', resizeMousemoveHandler)
  document.addEventListener('mouseup', resizeMouseupHandler)
}

const columns = computed(() => {
  return Object.values(leafColumns.value).flat()
})

const resizeMouseupHandler = () => {
  resizing.value = false
  document.removeEventListener('mousemove', resizeMousemoveHandler)
  document.removeEventListener('mouseup', resizeMouseupHandler)

  const { offsetWidth } = currentNode!
  columns.value[currentColIndex].width = offsetWidth
  columns.value[currentColIndex].minWidth = offsetWidth

  emit('columns-change')
  resetResizeState()
  updateFixedColumnsShadow()
}

/** 鼠标拖动 */
const resizeMousemoveHandler = throttle((e: MouseEvent) => {
  let targetWidth = currentNodeOriginWidth + e.pageX - startX + 'px'

  ~[
    headerCols![currentColIndex],
    bodyCols![currentColIndex],
    footerCols![currentColIndex]
  ].forEach((node) => {
    node.style.width = targetWidth
    node.style.minWidth = targetWidth
  })
}, 16.7)

const headerRef = shallowRef<HTMLDivElement>()

watch(scrollLeft, left => {
  headerRef.value!.scrollLeft = left
})
</script>
