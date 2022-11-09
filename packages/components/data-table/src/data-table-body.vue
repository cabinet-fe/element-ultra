<template>
  <VirtualList
    tag="table"
    :data="store.data"
    :total="store.data.length || 0"
    :item-size="itemSize"
    :height="bodyHeight"
    :class="ns.e('body')"
    @scroll="handleScroll"
    :idle="rootProps.idle"
  >
    <!-- 表格组 -->
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
    <template #default="{ list, style }">

      <DataTableRow
        v-for="item of list"
        :key="item.uid"
        :row="item"
        :style="style"
      />
    </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { dataBodyToken, dataTableToken } from './token'
import VirtualList from './virtual-list.vue'
import { provide } from 'vue'
import DataTableRow from './data-table-row.vue'

defineOptions({
  name: 'ElDataTableBody'
})

const {
  scrollState,
  leafColumns,
  ns,
  itemSize,
  store,
  bodyHeight,
  rootProps,
  getCellStyle
} = inject(dataTableToken)!

const ele = 'cell'

provide(dataBodyToken, {
  cellClass: ns.e(ele),
  leftCellClass: ns.em(ele, 'left'),
  centerCellClass: ns.em(ele, 'center'),
  rightCellClass: ns.em(ele, 'right')
})

const handleScroll = (s: any) => {
  for (const key in scrollState) {
    // @ts-ignore
    scrollState[key] = s[key]
  }
}
</script>
