<template>
  <div :class="[ns.b(), $attrs.class]" :style="{ height }">
    <!-- 表格工具栏 -->
    <ProTableTools v-if="toolsVisible" @key-enter="fetchData()">
      <template #searcher>
        <slot name="searcher" />
      </template>
      <template #tools>
        <slot name="tools" />
      </template>
    </ProTableTools>
    <!-- 数据表格 -->
    <el-data-table
      v-if="columns && columns.length"
      ref="tableRef"
      v-loading="loading"
      :default-expand-all="defaultExpandAll"
      :height="tableHeight"
      :data="computedData"
      :columns="columns"
      :show-summary="summaryVisible"
      :summary-method="computedSummaryMethod"
      :show-index="showIndex"
      :checkable="checkable"
      :selectable="selectable"
      :checked="state.checked"
      :selected="selected"
      :tree="tree"
      :item-reactive="itemReactive"
      @check="handleCheck"
      @select="emit('select', $event)"
      @row-click="handleRowClick"
      @sort="handleSort"
      :lazy-load="lazyLoad"
    >
      <template v-slot:[column.slot!]="ctx" v-for="column of columnSlots">
        <slot :name="column.slot!" v-bind="ctx" />
      </template>

      <template #column-conf="scoped">
        <slot name="column-conf" v-bind="scoped" />
      </template>
    </el-data-table>

    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      :class="ns.e('pagination')"
      style="justify-content: flex-end"
      v-model:current-page="pageQuery.page"
      v-model:page-size="pageQuery.size"
      @change="fetchData(false)"
      small
      layout="total, prev, pager, next,  sizes, jumper"
      :total="state.total"
      :page-sizes="pageSizes"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, shallowRef, useSlots, provide, shallowReadonly } from 'vue'
import {
  ElDataTable,
  DataTableInstance
} from '@element-ultra/components/data-table'
import ProTableTools from './pro-table-tools'
import { proTableProps, proTableEmits, ProTableColumn } from './pro-table'
import ElPagination from '@element-ultra/components/pagination'
import { useNamespace } from '@element-ultra/hooks'
import { ElLoadingDirective as vLoading } from '@element-ultra/components/loading'
import { proTableContextKey, proTableKey } from './token'
import useTableHeight from './use-table-height'
import { useApi } from './use-api'

defineOptions({
  name: 'ElProTable',
  inheritAttrs: false
})

const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const slots = useSlots()
const ns = useNamespace('pro-table')

/** 列插槽 */
const columnSlots = computed(() => {
  let slots: ProTableColumn[] = []

  const recursive = (columns?: ProTableColumn[]) => {
    columns?.forEach(column => {
      if (column.children?.length) return recursive(column.children)
      if (!column.slot) return
      slots.push(column)
    })
  }
  recursive(props.columns)

  return slots
})

const tableRef = shallowRef<DataTableInstance>()

const toolsVisible = computed(() => {
  return (slots.tools || slots.searcher) && props.showTools
})

const pageSizes = [20, 60, 120, 200, 1000]

const canAutoQuery = { value: true }

const setAutoQuery = (autoQuery: boolean) => {
  canAutoQuery.value = autoQuery
}

const {
  state,
  pageQuery,
  defaultQuery,
  loading,
  currentQueryStr,
  fetchData,
  handleSort,
  getParams,
  handleCheck
} = useApi({
  props,
  emit,
  canAutoQuery
})

const computedData = computed(() => {
  return props.data || state.data
})

const tableHeight = useTableHeight({ props })

/** 显示合计 */
const summaryVisible = computed(() => {
  return props.showSummary || !!state.statistics
})

/** 合计方法 */
const computedSummaryMethod = computed(() => {
  let s = state.statistics

  const formatter = new Intl.NumberFormat('zh-CN', {
    currency: 'RMB',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })

  return (props.summaryMethod ||
    (s
      ? ({ columns }: { columns: ProTableColumn[] }) => {
          return ['合计'].concat(
            columns.slice(slots['row-expand'] ? 0 : 1).map(column => {
              let number = s![column.key]
              if (number) {
                return column.preset === 'money'
                  ? formatter.format(number)
                  : String(number)
              }
              return ''
            })
          )
        }
      : undefined)) as any
})

const handleRowClick = (row: any, index: number) => {
  emit('row-click', row, index)
}

const find = () => {
  return computedData.value
}

const deleteRow = (index: number) => {
  state.data = [...state.data.slice(0, index), ...state.data.slice(index + 1)]
}

provide(proTableKey, {
  proTableSlots: slots,
  rootProps: props,
  ns,
  loading,
  defaultQuery,
  currentQueryStr,
  setAutoQuery,
  fetchData
})

const exposed = {
  state: shallowReadonly(state),
  fetchData,
  props,
  /** 获取查询参数 */
  getQueryParams: getParams,
  find,
  deleteRow,
  getColumns: () => tableRef.value?.getColumns() || []
}

provide(proTableContextKey, exposed)

defineExpose(exposed)
</script>
