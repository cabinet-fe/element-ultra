<template>
  <VirtualList
    tag="table"
    :data="rootProps.data"
    height="600px"
    style="width: 100%"
    :total="rootProps.data?.length || 0"
    :item-size="30"
    idle
  >
    <template #default="{ index, item, ...rest }">
      <tr v-bind="rest" :class="ns.e('row')">
        <td
          v-for="column of leafColumns"
          :class="ns.e('cell')"
          :key="column.key"
        >
          {{ column.key ? item[column.key] || '数据测试' : '-' }}
        </td>
      </tr>
    </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { inject } from 'vue'
import { dataTableToken } from './token'
import VirtualList from './virtual-list.vue'
const { leafColumns, rootProps } = inject(dataTableToken)!

const ns = useNamespace('data-table')
</script>
