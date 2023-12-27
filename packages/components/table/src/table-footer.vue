<template>
  <tfoot :class="ns.e('footer')">
    <tr v-if="!!summaryMethods">
      <td
        :style="{
          ...getCellStyle(columns[0], columns[0].fixed!),
          bottom: summaryBottom + 'px'
        }"
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
        :style="{
          ...getCellStyle(column, column.fixed),
          bottom: summaryBottom + 'px'
        }"
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

    <tr v-if="!!$slots.append" ref="appendRef" :class="ns.e('append')">
      <td :colspan="columns.length" :class="ns.e('append-cell')">
        <slot name="append"> </slot>
      </td>
    </tr>
  </tfoot>
</template>

<script lang="ts" setup>
import { getChainValue } from '@element-ultra/utils'
import { inject, watch, shallowRef } from 'vue'
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

const appendRef = shallowRef<HTMLTableRowElement>()

let observer: ResizeObserver | null = null

const summaryBottom = shallowRef(0)

watch(appendRef, (dom, oldDom) => {
  oldDom && observer?.unobserve(oldDom)
  observer?.disconnect()
  summaryBottom.value = 0
  if (dom) {
    observer = new ResizeObserver(entries => {
      const entry = entries[0]!
      summaryBottom.value = entry.contentRect.height
    })

    observer.observe(dom)
  }
})
</script>
