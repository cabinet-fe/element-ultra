<template>
  <FixedSizeList
    :data="data"
    :height="500"
    :total="data?.length || 0"
    :item-size="40"
  >
    <template #default="{ index, data, ...rest }">
      <div :class="ns.e('row')" v-bind="rest">
        <div :class="ns.e('cell')" v-for="column of leafColumns" :key="column.key">
          {{ column.key ? data[index][column.key] : '-' }}
        </div>
      </div>
    </template>
  </FixedSizeList>

  <!-- <DynamicSizeList :height="1000" :total="1000" :item-size="(i) => 40">
    <div></div>
  </DynamicSizeList> -->
</template>

<script lang="ts" setup>
import {
  FixedSizeList,
  // DynamicSizeList,
} from '@element-ultra/components/virtual-list'
import { useNamespace } from '@element-ultra/hooks'
import { inject } from 'vue'
import { dataTableToken } from './token'

const { leafColumns, data } = inject(dataTableToken)!

const ns = useNamespace('data-table')
</script>
