<template>
  <el-scrollbar
    :class="ns.e('wrap')"
    :z-index="2"
    @view-resize="containerWidth = $event.width"
    @scroll="handleScroll"
  >
    <table
      :class="[
        ns.b(),
        ns.m(tableSize),
        leftShadow ? ns.m('shadow-left') : undefined,
        rightShadow ? ns.m('shadow-right') : undefined
      ]"
      ref="tableDom"
    >
      <TableHeader />

      <TableBody>
        <template #empty>
          <slot name="empty" />
        </template>
      </TableBody>

      <TableFooter>
        <template #append v-if="$slots.append">
          <slot name="append" />
        </template>
      </TableFooter>
    </table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useNamespace, useSize } from '@element-ultra/hooks'
import TableHeader from './table-header.vue'
import TableBody from './table-body.vue'
import TableFooter from './table-footer.vue'
import {
  tableProps,
  FinalTableColumn,
  tableEmits,
  SummaryMethod
} from './table'
import { computed, CSSProperties, provide, shallowRef } from 'vue'
import { tableToken } from './token'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import useColumns from './use-columns'
import useShadow from './use-shadow'

const ns = useNamespace('table')

const props = defineProps(tableProps)

const emit = defineEmits(tableEmits)

const { columns, columnLayouts } = useColumns({
  props
})

const containerWidth = shallowRef(0)

const tableSize = useSize({
  props
})

const { handleScroll, leftShadow, rightShadow } = useShadow()

const summaryMethods = computed(() => {
  const summaries = columns.value.filter(column => !!column.summary)
  if (!summaries.length) return undefined

  const commonSummary = (ctx: any) => ctx.total

  return summaries.reduce((acc, cur) => {
    acc[cur.key] =
      typeof cur.summary === 'function' ? cur.summary! : commonSummary
    return acc
  }, {} as Record<string, SummaryMethod>)
})

const cellGetters = {
  left: (column: FinalTableColumn) => ({
    left: column.left + 'px'
  }),
  right: (column: FinalTableColumn) => ({
    right: column.right + 'px'
  }),
  center: () => ({})
}

const getCellStyle = (
  column: FinalTableColumn,
  type: 'left' | 'center' | 'right' = 'center'
): CSSProperties => {
  return {
    textAlign: column.align || 'left',
    ...cellGetters[type](column)
  }
}

provide(tableToken, {
  containerWidth,
  rootProps: props,
  rootEmit: emit,
  ns,
  columns,
  columnLayouts,
  getCellStyle,
  summaryMethods
})

const tableDom = shallowRef<HTMLTableElement>()

defineExpose({
  tableDom
})
</script>
