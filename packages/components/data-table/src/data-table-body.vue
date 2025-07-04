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
      <tr v-if="!list.length" :class="ns.e('row')">
        <td
          :class="ns.e('cell')"
          :colspan="
            leafColumns.left.length +
            leafColumns.center.length +
            leafColumns.right.length
          "
          :style="style"
        >
          <span style="position: sticky; left: 50%; transform: translate(-50%)">
            暂无数据
          </span>
        </td>
      </tr>
      <DataTableRow
        v-for="(item, index) of list"
        @click="emit('row-click', item, index)"
        :class="ns.is('odd', index % 2 === 1)"
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
  getCellStyle,
  emit
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
