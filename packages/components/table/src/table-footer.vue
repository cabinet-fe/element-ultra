<template>
  <tr :class="ns.e('footer')">
    <td
      :style="getCellStyle(columns[0], columns[0].fixed!)"
      :class="[
        ns.e('footer-cell'),
        ns.em('footer-cell', columns[0].fixed || 'center'),
        ns.is('last', columns[0].typeLast),
        ns.is('first', columns[0].typeFirst)
      ]"
    >
      合计
    </td>

    <td
      v-for="column of columns.slice(1)"
      :style="getCellStyle(column, column.fixed)"
      :class="[
        ns.e('footer-cell'),
        ns.em('footer-cell', column.fixed || 'center'),
        ns.is('last', column.typeLast),
        ns.is('first', column.typeFirst)
      ]"
      :key="column.key"
    >
      {{
        summaryMethods![column.key]?.({
          key: column.key,
          data: rootProps.data,
          total: rootProps.data.reduce((acc, cur) => acc + +cur[column.key], 0)
        })
      }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { tableToken } from './token'

const { columns, ns, rootProps, summaryMethods, getCellStyle } =
  inject(tableToken)!
</script>
