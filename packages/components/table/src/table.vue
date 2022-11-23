<template>
  <el-scrollbar style="height: 100%" :z-index="2">
    <table :class="[ns.b(), ns.m(size)]">
      <TableHeader />

      <TableBody />

      <TableFooter />
    </table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import TableHeader from './table-header.vue'
import TableBody from './table-body.vue'
import TableFooter from './table-footer.vue'
import { tableProps, TableColumn } from './table'
import {
  CSSProperties,
  provide,
  reactive,
  shallowRef,
  watch
} from 'vue'
import { tableToken } from './token'
import { ElScrollbar } from '@element-ultra/components/scrollbar'

const ns = useNamespace('table')

const props = defineProps(tableProps)

const columnLayouts = shallowRef<{
  left: TableColumn[]
  center: TableColumn[]
  right: TableColumn[]
}>({
  left: [],
  center: [],
  right: []
})

const columns = shallowRef<TableColumn[]>([])

watch(
  () => props.columns,
  _columns => {
    const left: TableColumn[] = []
    const center: TableColumn[] = []
    const right: TableColumn[] = []

    const result = {
      left,
      center,
      right
    }

    if (!_columns?.length) {
      columnLayouts.value = result
      return
    }

    _columns.forEach(column => {
      if (typeof column.name === 'string') {
        const { name } = column
        column.name = () => name
      }

      if (!column.render) {
        column.render = ({ val }) => val
      }

      const { fixed } = column

      let reactiveColumn = reactive(column)
      // TODO计算left和right
      if (fixed === 'left') {

        left.push(reactiveColumn)
      } else if (fixed === 'right') {
        right.push(reactiveColumn)
      } else {
        center.push(reactiveColumn)
      }
    })

    columnLayouts.value = result
    columns.value = Object.values(result).flat(1)
  },
  { immediate: true }
)

const getCellStyle = (column: TableColumn): CSSProperties => {
  return {
    textAlign: column.align || 'left'
  }
}

provide(tableToken, {
  rootProps: props,
  ns,
  columnLayouts,
  columns,
  getCellStyle
})
</script>
