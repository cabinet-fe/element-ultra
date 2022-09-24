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
          <template v-for="column of row" :key="column.key">
            <LeftCell
              v-if="column.data.fixed === 'left'"
              :header="column"
              :row-index="rowIndex"
            />
            <RightCell
              v-else-if="column.data.fixed === 'right'"
              :header="column"
              :row-index="rowIndex"
            />
            <CenterCell v-else :header="column" :row-index="rowIndex" />
          </template>
        </tr>
      </thead>
    </table>
  </div>

  <!-- 对齐调节器 -->
  <DataTableAlignAdjuster ref="adjusterRef" />
</template>

<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<script lang="ts" setup>
import DataTableAlignAdjuster from './data-table-align-adjuster.vue'
import { throttle } from 'lodash'
import { computed, inject, provide, shallowRef, watch } from 'vue'
import { dataHeaderToken, dataTableToken } from './token'
import type { TableHeader } from './utils'
import { LeftCell, RightCell, CenterCell } from './data-table-header-cell'

const {
  headerRows,
  scrollLeft,
  leafColumns,
  ns,
  headerRef,
  updateFixedColumnsShadow,
  getCellStyle,
  computePosition
} = inject(dataTableToken)!

const rowLength = computed(() => headerRows.value.length)

/**
 * 合并行
 * @param header
 * @param rowIndex
 */
const getCellRowSpan = (header: TableHeader, rowIndex: number) => {
  // 没有子元素进行合并
  return header.children?.length ? undefined : rowLength.value - rowIndex
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

/** 鼠标拖动 */
const resizeMousemoveHandler = throttle((e: MouseEvent) => {
  let targetWidth = currentNodeOriginWidth + e.pageX - startX + 'px'

  ~[
    headerCols![currentColIndex],
    bodyCols![currentColIndex],
    footerCols![currentColIndex]
  ].forEach(node => {
    if (!node) return
    node.style.width = targetWidth
    node.style.minWidth = targetWidth
  })
}, 16.7)

const resizeMouseupHandler = () => {
  resizing.value = false
  document.removeEventListener('mousemove', resizeMousemoveHandler)
  document.removeEventListener('mouseup', resizeMouseupHandler)

  const { offsetWidth } = currentNode!
  columns.value[currentColIndex].width = offsetWidth
  columns.value[currentColIndex].minWidth = offsetWidth

  computePosition()
  resetResizeState()
  updateFixedColumnsShadow()
}

watch(scrollLeft, left => {
  headerRef.value!.scrollLeft = left
})

const adjusterRef = shallowRef<InstanceType<typeof DataTableAlignAdjuster>>()

provide(dataHeaderToken, {
  getCellRowSpan,
  cellClass: ns.e('header-cell'),
  leftCellClass: ns.em('header-cell', 'left'),
  centerCellClass: ns.em('header-cell', 'center'),
  rightCellClass: ns.em('header-cell', 'right'),
  resizeClass: ns.e('column-resize'),
  handleResizeMousedown,
  adjusterRef
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
