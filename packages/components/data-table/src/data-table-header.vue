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
          <template v-for="(columns, key) in getRowColumns(row)">
            <template v-if="key === 'left'">
              <LeftCell
                v-for="(column, colIndex) of columns"
                :header="column"
                :row-index="rowIndex"
                :key="column.data.key"
                :class="ns.is('last', colIndex + 1 === columns.length)"
              />
            </template>

            <template v-else-if="key === 'right'">
              <RightCell
                v-for="(column, colIndex) of columns"
                :header="column"
                :row-index="rowIndex"
                :key="column.data.key"
                :class="ns.is('first', colIndex === 0)"
              />
            </template>

            <template v-else>
              <CenterCell
                v-for="column of columns"
                :header="column"
                :key="column.data.key"
                :row-index="rowIndex"
              />
            </template>
          </template>
        </tr>
      </thead>
    </table>
  </div>

  <!-- 对齐调节器 -->
  <DataTableAlignAdjuster ref="adjusterRef">
    <template #default="scoped">
      <slot name="column-conf" v-bind="scoped" />
    </template>
  </DataTableAlignAdjuster>
</template>

<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<script lang="ts" setup>
import DataTableAlignAdjuster from './data-table-align-adjuster.vue'
import { throttle } from 'lodash'
import { computed, inject, onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import { dataHeaderToken, dataTableToken } from './token'
import type { TableHeader } from './utils'
import { LeftCell, RightCell, CenterCell } from './data-table-header-cell'

const emit = defineEmits({
  'column-resize': (position: string, visible: boolean) => true
})

const {
  headerRows,
  scrollState,
  leafColumns,
  ns,
  headerRef,
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

/** 是否resize中 */
const resizing = shallowRef(false)

let mouseStartX = 0
let currentColIndex = -1
let currentNodeOriginWidth = 0
let currentNode: HTMLElement | null = null

let containerLeft = 0

/** 重置为初始状态 */
const resetResizeState = () => {
  mouseStartX = 0
  currentColIndex = -1
  currentNodeOriginWidth = 0
  currentNode = null
}

// 找到
const handleResizeMousedown = (e: MouseEvent, header: TableHeader) => {
  resizing.value = true
  mouseStartX = e.pageX

  // 表头容器相对于屏幕的左偏移量(resizeline的left = mouseX - header.left)
  const { left } = headerRef.value!.getBoundingClientRect()
  containerLeft = left

  emit('column-resize', e.pageX - containerLeft + 'px', resizing.value)

  currentColIndex = header.data.index!
  currentNode = (e.target as HTMLSpanElement).closest('th')
  currentNodeOriginWidth = currentNode!.offsetWidth

  document.addEventListener('mousemove', resizeMousemoveHandler)
  document.addEventListener('mouseup', resizeMouseupHandler)
}

const columns = computed(() => {
  return Object.values(leafColumns.value).flat()
})

/** 鼠标拖动 */
const resizeMousemoveHandler = throttle((e: MouseEvent) => {
  emit('column-resize', e.pageX - containerLeft + 'px', resizing.value)
}, 0)

const resizeMouseupHandler = (e: MouseEvent) => {
  resizing.value = false
  emit('column-resize', e.pageX - containerLeft + 'px', resizing.value)
  const targetWidth = currentNodeOriginWidth + e.pageX - mouseStartX
  document.removeEventListener('mousemove', resizeMousemoveHandler)
  document.removeEventListener('mouseup', resizeMouseupHandler)

  columns.value[currentColIndex].width = targetWidth
  columns.value[currentColIndex].minWidth = targetWidth

  computePosition()
  resetResizeState()
}

const getRowColumns = (columns: TableHeader[]) => {
  const left: TableHeader[] = []
  const center: TableHeader[] = []
  const right: TableHeader[] = []
  columns.forEach(column => {
    if (column.data.fixed === 'left') {
      left.push(column)
    } else if (column.data.fixed === 'right') {
      right.push(column)
    } else {
      center.push(column)
    }
  })
  return {
    left,
    center,
    right
  }
}

watch(
  () => scrollState.scrollLeft,
  left => {
    headerRef.value!.scrollLeft = left
  }
)

const adjusterRef = shallowRef<InstanceType<typeof DataTableAlignAdjuster>>()

const windowClickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const trigger = target.closest('.adjuster-trigger')
  const adjuster = target.closest('.el-data-table__align-adjuster')
  if (trigger || adjuster) return
  adjusterRef.value?.close()
}
window.addEventListener('click', windowClickHandler)

onBeforeUnmount(() => {
  window.removeEventListener('click', windowClickHandler)
})

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
