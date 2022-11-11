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
          :key="column.key"
          :value="summaryData[colIndex]"
          :class="ns.is('last', colIndex + 1 === leafColumns.left.length)"
        />
        <!-- 中 -->
        <CenterCell
          v-for="(column, colIndex) in leafColumns.center"
          :column="column"
          :key="column.key"
          :value="summaryData[colIndex + leafColumns.left.length]"
          :class="ns.is('last', colIndex + 1 === leafColumns.center.length)"
        />
        <!-- 右 -->
        <RightCell
          v-for="(column, colIndex) in leafColumns.right"
          :column="column"
          :key="column.key"
          :value="
            summaryData[
              colIndex + leafColumns.left.length + leafColumns.center.length
            ]
          "
          :class="ns.is('first', colIndex === 0)"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, provide, watch } from 'vue'
import { dataFooterToken, dataTableToken } from './token'
import { LeftCell, CenterCell, RightCell } from './data-table-footer-cell'

const { rootProps, leafColumns, ns, scrollState, footerRef, getCellStyle } =
  inject(dataTableToken)!

const ele = 'footer-cell'

const zhMoneyFormat = new Intl.NumberFormat('zh-CN', {
  currency: 'RMB',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})
/** 合计数据 */
const summaryData = computed(() => {
  // 平铺叶子节点的数据
  const columns = Object.values(leafColumns.value).flat()

  if (rootProps.summaryMethod) {
    return rootProps.summaryMethod({
      columns,
      data: rootProps.data
    })
  }

  const result: Array<number | string> = columns.map(column => {
    let ret = 0
    let isValidNumber = true
    rootProps.data.some(item => {
      let v = +item[column.key]
      if (isNaN(v)) {
        isValidNumber = false
        // 退出
        return true
      }
      ret += v
    })
    return isValidNumber ? column.preset === 'money' ? zhMoneyFormat.format(ret) : ret : ''
  })

  result[0] = '合计'

  return result
})

provide(dataFooterToken, {
  cellClass: ns.e(ele),
  leftCellClass: ns.em(ele, 'left'),
  centerCellClass: ns.em(ele, 'center'),
  rightCellClass: ns.em(ele, 'right')
})

watch(() => scrollState.scrollLeft, left => {
  footerRef.value!.scrollLeft = left
})
</script>
