<template>
  <VirtualList
    tag="table"
    :data="rootProps.data"
    height="500px"
    :total="rootProps.data?.length || 0"
    :item-size="40"
  >
    <template #default="{ index, row, ...rest }">
      <tr :class="ns.e('row')" v-bind="rest">
        <td
          :class="ns.e('cell')"
          v-for="column of leafColumns"
          :key="column.key"
        >
          {{ column.key ? row[column.key] : '-' }}
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
