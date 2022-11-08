<template>
  <tr :class="ns.e('row')">

    <!-- 左 -->
    <LeftCell
      v-for="(column, colIndex) in leafColumns.left"
      :column="column"
      :row="row"
      :style="style"
      :class="ns.is('last', colIndex + 1 === leafColumns.left.length)"
    />

    <!-- 中 -->
    <CenterCell
      v-for="(column, colIndex) in leafColumns.center"
      :column="column"
      :row="row"
      :style="style"
      :class="ns.is('last', colIndex + 1 === leafColumns.center.length)"
    />

    <!-- 右 -->
    <RightCell
      v-for="(column, colIndex) in leafColumns.right"
      :column="column"
      :row="row"
      :style="style"
      :class="ns.is('first', colIndex === 0)"
    />
  </tr>
</template>

<script lang="ts" setup>
import { CSSProperties, inject, PropType } from 'vue'
import { dataTableToken } from './token'
import { LeftCell, CenterCell, RightCell } from './data-table-cell'
import type { Row, TreeRow } from './data-table'

defineProps({
  row: {
    type: Object as PropType<TreeRow | Row>,
    required: true
  },
  style: {
    type: Object as PropType<CSSProperties>,
    required: true
  }
})

const { ns, leafColumns } = inject(dataTableToken)!
</script>
