<template>
  <div :class="[ns.b(), $attrs.class]" :style="{ height }">
    <ProTableTools
      v-if="$slots.tools || $slots.searcher || showTools"
      @key-enter="fetchData"
      @search="fetchData"
      @tools-resize="calcTableHeight"
    />
    <el-table
      :data="computedData"
      v-if="columns && columns.length"
      v-bind="$attrs"
      :default-expand-all="defaultExpandAll"
      ref="tableRef"
      :height="tableHeight"
      border
      v-loading="loading"
    >
      <!-- 展开 -->
      <pro-table-column :column="expandColumn" v-if="$slots['row-expand']">
        <template #default="scope">
          <slot name="row-expand" v-bind="scope" />
        </template>
      </pro-table-column>

      <!-- 前置的 -->
      <el-table-column
        v-bind="column"
        v-for="column of preColumns"
        :key="column.key"
      />

      <pro-table-column
        v-for="column of columns"
        :column="column"
        :key="column.key"
      >
        <template
          v-if="!column.children?.length && column.slot"
          #default="scope"
        >
          <slot v-bind="scope" :name="column.slot" />
        </template>
      </pro-table-column>
    </el-table>

    <el-pagination
      :class="ns.e('pagination')"
      v-if="pagination"
      style="justify-content: flex-end"
      v-model:current-page="query.page"
      v-model:page-size="query.size"
      @change="fetchData(false)"
      small
      layout="total, prev, pager, next,  sizes, jumper"
      :total="state.total"
      :page-sizes="pageSizes"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  shallowReactive,
  watch,
  shallowRef,
  useSlots,
  provide
} from 'vue'
import ElTable from '@element-ultra/components/table'
import ProTableColumn from './pro-table-column.vue'
import ProTableTools from './pro-table-tools'
import { ElTableColumn } from '@element-ultra/components/table'
import { proTableProps } from './pro-table'
import usePreColumns from './use-pre-columns'
import ElPagination from '@element-ultra/components/pagination'
import { RequestResponse, useConfig, useNamespace } from '@element-ultra/hooks'
import { ElLoadingDirective as vLoading } from '@element-ultra/components/loading'
import { proTableKey } from './token'
import { debounce } from 'lodash'

defineOptions({
  name: 'ElProTable',
  inheritAttrs: false
})

const props = defineProps(proTableProps)
const slots = useSlots()
const ns = useNamespace('pro-table')

const emit = defineEmits({
  fetch: (query: Record<string, any>) => true,
  loaded: (res: RequestResponse) => true
})

const [configStore] = useConfig()

const pageSizes = [20, 40, 60, 120, 200]

const query = shallowReactive({
  page: 1,
  size: configStore.proTableDefaultSize || 20
})

const state = shallowReactive({
  total: 0,
  data: [] as any[]
})

const computedData = computed(() => {
  return props.data || state.data
})

//  计算表格高度
const tableHeight = shallowRef<string | undefined>(undefined)
const calcTableHeight = debounce(
  (toolsHeight: number) => {
    if (!props.height) return
    // 累加值
    let accumulation = toolsHeight + 6 // 6是margin-bottom的值

    if (props.pagination) {
      accumulation += 28
    }
    tableHeight.value = `calc(${props.height} - ${accumulation}px)`
  },
  500,
  {
    leading: true
  }
)

let loading = shallowRef(false)

const getQueryParams = () => {
  let _query = {
    ...props.query,
    ...(props.pagination ? query : null)
  } as Record<string, any>
  // 还原真实的请求参数
  let realQuery = Object.keys(_query).reduce((acc, cur) => {
    let v = _query[cur]
    if (cur.startsWith('$')) {
      cur = cur.slice(1)
    }
    acc[cur] = v
    return acc
  }, {} as Record<string, any>)

  return {
    api: props.api!,
    query: realQuery
  }
}

/**
 * 查询数据
 * @param resetPage 是否重置分页, 只有在 分页相关的组件改变时无需重置
 */
const fetchData = async (resetPage = true) => {
  if (!props.api || !configStore.proTableRequestMethod || props.data) return

  loading.value = true

  if (resetPage) {
    query.page = 1
  }

  let params = getQueryParams()
  emit('fetch', params)
  const res = await configStore.proTableRequestMethod(params).finally(() => {
    loading.value = false
  })
  const { total, data } = res

  if (total) {
    state.total = total
  }
  state.data = data

  emit('loaded', res)
}

let canAutoQuery = shallowRef(true)
const setAutoQuery = (autoQuery: boolean) => {
  canAutoQuery.value = autoQuery
}
// query发生改变时重新监听里面的属性
let stopWatchQueryProps: () => void
watch(
  () => props.query,
  propQuery => {
    stopWatchQueryProps?.()

    if (!propQuery) return

    const watchList = Object.keys(propQuery)
      .filter(k => k.startsWith('$'))
      .map(k => () => propQuery[k])

    // hack行为, 在属性名前面加上$表示该表格自动根据该属性的变化过滤数据
    stopWatchQueryProps = watch(watchList, () => {
      canAutoQuery.value && fetchData()
    })
  },
  { immediate: true }
)

watch(
  () => props.api,
  () => fetchData()
)
fetchData()

const tableRef = shallowRef()
const [expandColumn, preColumns] = usePreColumns(props, tableRef)

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
  setAutoQuery,
  fetchData,
  loading
})

defineExpose({
  state,
  fetchData,
  /** 获取查询参数 */
  getQueryParams,
  find,
  deleteRow,
  toggleRowSelection: (row: any, selected: boolean) =>
    tableRef.value?.toggleRowSelection(row, selected)
})
</script>
