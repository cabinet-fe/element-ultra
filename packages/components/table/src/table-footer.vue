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
          total: rootProps.data.reduce(
            (acc, cur) => sum(acc, +(getChainValue(cur, column.key) ?? 0)),
            0
          )
        })
      }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { getChainValue } from 'utils'
import { inject } from 'vue'
import { tableToken } from './token'

const DotRE = /\.(\d+)/
const getDotLen = (n: number) => {
  return String(n).match(DotRE)?.[1]?.length ?? 0
}
const sum = (num1: number, num2: number) => {
  const mul = 10 ** Math.max(getDotLen(num1), getDotLen(num2))
  return (Math.round(num1 * mul) + Math.round(num2 * mul)) / mul
}

const { columns, ns, rootProps, summaryMethods, getCellStyle } =
  inject(tableToken)!
</script>
