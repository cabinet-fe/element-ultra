<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.is('left-fixed-shadow')]: showLeftFixedShadow,
      [ns.is('right-fixed-shadow')]: showRightFixedShadow,
      [ns.is('stripe')]: stripe
    }"
    :style="{ height }"
  >
    <!-- 表头 -->
    <DataTableHeader @column-resize="handleColumnResize">
      <template #column-conf="scoped">
        <slot name="column-conf" v-bind="scoped" />
      </template>
    </DataTableHeader>

    <!-- 表体 -->
    <DataTableBody />

    <!-- 合计行. 树形结构显示不能显示合计行 -->
    <DataTableFooter v-if="showSummary" />

    <!-- size线 -->
    <div :class="ns.e('resize-line')" ref="lineRef"></div>
  </div>
</template>

<script setup lang="ts">
import { provide, shallowRef } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import DataTableHeader from './data-table-header.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { dataTableProps, dataTableEmits } from './data-table'
import { dataTableToken } from './token'
import useColumns from './hooks/use-columns'
import useStyle from './hooks/use-style'
import useState from './hooks/use-state'
import { useDomRefProvide } from './hooks/use-dom-ref'

defineOptions({
  name: 'ElDataTable'
})

const ns = useNamespace('data-table')

const props = defineProps(dataTableProps)
const emit = defineEmits(dataTableEmits)

// 提供domRefs
const refs = useDomRefProvide()

// 数据状态
const state = useState(props, emit)

// 列
const columns = useColumns(props, emit, state)

// 样式
const styles = useStyle(props, refs)

const { showLeftFixedShadow, showRightFixedShadow } = styles

provide(dataTableToken, {
  ...state,
  ...columns,
  ...styles,
  ns,
  rootProps: props,
  emit
})

const lineRef = shallowRef<HTMLElement>()

const handleColumnResize = (left: string, visible: boolean) => {
  lineRef.value!.style.left = left
  lineRef.value!.style.visibility = visible ? 'visible' : 'hidden'
}

defineExpose({
  getColumns: columns.getColumns
})
</script>
