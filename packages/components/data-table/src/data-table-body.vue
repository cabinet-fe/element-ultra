<template>
  <VirtualList
    tag="table"
    :data="rootProps.data"
    height="600px"
    :total="rootProps.data?.length || 0"
    :item-size="32"
    :class="ns.e('body')"
    @scroll="handleScroll"
    idle
  >
    <template #prepend>
      <colgroup>
        <template v-for="item of columns">
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
        <template v-for="(columnItem, type) of columns">
          <td
            v-for="column of columnItem"
            :class="[ns.e('cell'), ns.e(`cell--${type}`)]"
          >
            <div v-bind="rest" :style="{ 'justify-content': column.align }">
              <ElSlotsRender
                :nodes="[column.render!(item[column.key], item, index)]"
              />
            </div>
          </td>
        </template>
      </tr>
    </template>

    <template #append> </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { inject } from 'vue'
import { dataTableToken } from './token'
import VirtualList from './virtual-list.vue'
import ElSlotsRender from '@element-ultra/components/slots-render'

const ns = useNamespace('data-table')
const { rootProps, getCellStyle, scrollLeft, columns } = inject(dataTableToken)!

const handleScroll = (s: any) => {
  scrollLeft.value = s.scrollLeft
}
</script>
