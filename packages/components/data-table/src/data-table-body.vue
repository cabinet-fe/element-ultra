<template>
  <VirtualList
    tag="table"
    :data="rootProps.data"
    height="600px"
    :total="rootProps.data?.length || 0"
    :item-size="itemSize"
    :class="ns.e('body')"
    @scroll="handleScroll"
    @resize="handleResize"
    idle
  >
    <!-- 组 -->
    <template #prepend>
      <colgroup :class="ns.e('body-group')">
        <template v-for="item in leafColumns">
          <col
            v-for="column of item"
            :key="column.key"
            :style="getCellStyle(column)"
          />
        </template>
      </colgroup>
    </template>

    <!-- 主数据 -->
    <template #default="scoped">
      <tr :class="ns.e('row')">
        <!-- 左 -->
        <LeftCell
          v-for="(column, colIndex) in leafColumns.left"
          :column="column"
          :row-scoped="scoped"
          :class="ns.is('last', colIndex + 1 === leafColumns.left.length)"
        />
        <!-- 中 -->
        <CenterCell
          v-for="(column, colIndex) in leafColumns.center"
          :column="column"
          :row-scoped="scoped"
          :class="ns.is('last', colIndex + 1 === leafColumns.center.length)"
        />
        <!-- 右 -->
        <RightCell
          v-for="(column, colIndex) in leafColumns.right"
          :column="column"
          :row-scoped="scoped"
          :class="ns.is('first', colIndex === 0)"
        />
      </tr>
    </template>

    <!-- 合计栏 -->
    <template #append> </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { dataBodyToken, dataTableToken } from './token'
import VirtualList from './virtual-list.vue'
import { provide } from 'vue'
import { LeftCell, CenterCell, RightCell } from './data-table-cell'

defineOptions({
  name: 'ElDataTableBody'
})

const {
  rootProps,
  getCellStyle,
  scrollLeft,
  scrollWidth,
  offsetWidth,
  leafColumns,
  ns,
  itemSize
} = inject(dataTableToken)!

const ele = 'cell'

provide(dataBodyToken, {
  cellClass: ns.e(ele),
  leftCellClass: ns.em(ele, 'left'),
  centerCellClass: ns.em(ele, 'center'),
  rightCellClass: ns.em(ele, 'right')
})

const handleScroll = (s: any) => {
  scrollLeft.value = s.scrollLeft
}

const handleResize = (el: Element) => {
  scrollLeft.value = el.scrollLeft
  scrollWidth.value = el.scrollWidth
  offsetWidth.value = (el as HTMLElement).offsetWidth
}
</script>
