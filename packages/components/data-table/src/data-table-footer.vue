<template>
  <div :class="ns.e('footer-wrap')" ref="footerRef">
    <table :class="ns.e('footer')">
      <!-- 组 -->
      <colgroup :class="ns.e('footer-group')">
        <template v-for="item in leafColumns">
          <col
            v-for="column of item"
            :key="column.key"
            :style="getCellStyle(column)"
          />
        </template>
      </colgroup>

      <tr :class="ns.e('footer')" v-if="rootProps.showSummary">
        <!-- 左 -->
        <LeftCell
          v-for="(column, colIndex) in leafColumns.left"
          :column="column"
          :class="ns.is('last', colIndex + 1 === leafColumns.left.length)"
        />
        <!-- 中 -->
        <CenterCell
          v-for="(column, colIndex) in leafColumns.center"
          :column="column"
          :class="ns.is('last', colIndex + 1 === leafColumns.center.length)"
        />
        <!-- 右 -->
        <RightCell
          v-for="(column, colIndex) in leafColumns.right"
          :column="column"
          :class="ns.is('first', colIndex === 0)"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { inject, provide, shallowRef, watch } from 'vue'
import { dataFooterToken, dataTableToken } from './token'
import { LeftCell, CenterCell, RightCell } from './data-table-footer-cell'

const { rootProps, leafColumns, ns, scrollLeft, getCellStyle } =
  inject(dataTableToken)!

const ele = 'footer-cell'

provide(dataFooterToken, {
  cellClass: ns.e(ele),
  leftCellClass: ns.em(ele, 'left'),
  centerCellClass: ns.em(ele, 'center'),
  rightCellClass: ns.em(ele, 'right')
})

const footerRef = shallowRef<HTMLDivElement>()

watch(scrollLeft, left => {
  footerRef.value!.scrollLeft = left
})
</script>
