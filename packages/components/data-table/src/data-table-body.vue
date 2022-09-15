<template>
  <VirtualList
    tag="table"
    :data="rootProps.data"
    height="600px"
    :total="rootProps.data?.length || 0"
    :item-size="32"
    :class="ns.e('body')"
    @scroll="handleScroll"
    @resize="handleResize"
    idle
  >
    <template #prepend>
      <colgroup>
        <template v-for="item in leafColumns">
          <col
            v-for="column of item"
            :key="column.key"
            :style="getCellStyle(column)"
          />
        </template>
      </colgroup>
    </template>

    <template #default="{ index, item, ...rest }">
      <tr :class="ns.e('row')">
        <!-- 左 -->
        <td
          v-for="(column, colIndex) in leafColumns.left"
          :key="column.key"
          :class="[
            cellClass,
            ns.is('left'),
            ns.is('last', colIndex + 1 === leafColumns.left.length)
          ]"
          :style="{
            left: column.left + 'px'
          }"
        >
          <div v-bind="rest" :style="{ 'justify-content': column.align }">
            <ElSlotsRender
              :nodes="[column.render!(getChainValue(item, column.key), item, index)]"
            />
          </div>
        </td>

        <!-- 中 -->
        <td
          v-for="(column, colIndex) of leafColumns.center"
          :key="column.key"
          :class="[
            cellClass,
            ns.is('center'),
            ns.is('last', colIndex + 1 === leafColumns.center.length)
          ]"
        >
          <div v-bind="rest" :style="{ 'justify-content': column.align }">
            <ElSlotsRender
              :nodes="[
                column.render!(getChainValue(item, column.key), item, index)
              ]"
            />
          </div>
        </td>

        <!-- 右 -->
        <td
          v-for="(column, colIndex) in leafColumns.right"
          :key="column.key"
          :class="[cellClass, ns.is('right'), ns.is('first', colIndex === 0)]"
          :style="{
            right: column.right + 'px'
          }"
        >
          <div v-bind="rest" :style="{ 'justify-content': column.align }">
            <ElSlotsRender
              :nodes="[column.render!(getChainValue(item, column.key), item, index)]"
            />
          </div>
        </td>
      </tr>
    </template>

    <template #append> </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { dataTableToken } from './token'
import VirtualList from './virtual-list.vue'
import ElSlotsRender from '@element-ultra/components/slots-render'
import { getChainValue } from '@element-ultra/utils'

defineOptions({
  name: 'ElDataTableBody'
})

const ns = useNamespace('data-table')
const cellClass = ns.e('cell')

const {
  rootProps,
  getCellStyle,
  scrollLeft,
  scrollWidth,
  offsetWidth,
  leafColumns
} = inject(dataTableToken)!

const handleScroll = (s: any) => {
  scrollLeft.value = s.scrollLeft
}

const handleResize = (el: Element) => {
  scrollLeft.value = el.scrollLeft
  scrollWidth.value = el.scrollWidth
  offsetWidth.value = (el as HTMLElement).offsetWidth
}
</script>
