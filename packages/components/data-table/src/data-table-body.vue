<template>
  <VirtualList
    tag="ul"
    :data="rootProps.data"
    height="800px"
    :total="rootProps.data?.length || 0"
    :item-size="80"
    idle
  >
    <template #default="{ index, item, ...rest }">
      <li v-bind="rest" :class="ns.e('row')">
        <span
          :class="ns.e('cell')"
          v-for="column of leafColumns"
          :key="column.key"
        >
          {{ column.key ? item[column.key] : '-' }}
        </span>
      </li>
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
