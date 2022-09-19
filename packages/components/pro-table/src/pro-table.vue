<template>
  <div :class="[ns.b(), $attrs.class]" :style="{ height }">
    <ProTableTools
      v-if="toolsVisible"
      @key-enter="fetchData"
      @search="fetchData"
      @tools-resize="calcTableHeight"
    />
    <!-- 缺少合计的方法 -->
    <el-data-table
      v-if="columns && columns.length"
      :data="computedData"
      :columns="columns"
      :show-summary="summaryVisible"
      :show-index="showIndex"
      :checkable="checkable"
      :selectable="selectable"
      v-loading="loading"
      @check="emit('update:checked', $event)"
      @select="emit('update:selected', $event)"
    >
    </el-data-table>

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
  provide,
  onMounted
} from 'vue'


import ElDataTable from '@element-ultra/components/data-table'
import ProTableTools from './pro-table-tools'
import { proTableProps, proTableEmits } from './pro-table'
import ElPagination from '@element-ultra/components/pagination'
import { useConfig, useNamespace } from '@element-ultra/hooks'
import { ElLoadingDirective as vLoading } from '@element-ultra/components/loading'
import { proTableContextKey, proTableKey } from './token'
import { debounce } from 'lodash'

defineOptions({
  name: 'ElProTable',
  inheritAttrs: false
})

const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const slots = useSlots()
const ns = useNamespace('pro-table')

const toolsVisible = computed(() => {
  return (slots.tools || slots.searcher) && props.showTools
})



const [configStore] = useConfig()

const pageSizes = [20, 40, 60, 120, 200, 1000]

const query = shallowReactive({
  page: 1,
  size: configStore.proTableDefaultSize || 20
})

const state = shallowReactive({
  total: 0,
  data: [] as any[],
  selection: [] as any[]
})

const handleSelectionChange = (selection: any[]) => {
  state.selection = selection
}

const computedData = computed(() => {
  return props.data || state.data
})

//  计算表格高度
const tableHeight = shallowRef<string | undefined>(undefined)
const calcTableHeight = debounce(
  (toolsHeight: number) => {
    if (!props.height) return
    // 累加值
    let accumulation = toolsHeight ? toolsHeight + 6 : 0 // 6是margin-bottom的值

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

onMounted(() => {
  !toolsVisible.value && calcTableHeight(0)
})

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

// 后端是否有统计字段
let statistics = shallowRef<Record<string, number>>()
/** 显示合计 */
const summaryVisible = computed(() => {
  return props.showSummary || !!statistics.value
})

/** 合计方法 */
const computedSummaryMethod = computed(() => {
  let s = statistics.value
  let { columns = [] } = props

  const formatter = new Intl.NumberFormat('zh-CN', {
    currency: 'RMB',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  // TODO 这里的类型断言需要去掉
  return (props.summaryMethod ||
    (s
      ? (item: any) => {
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

/**
 * 查询数据
 * @param resetPage 是否重置分页, 只有在 分页相关的组件改变时无需重置
 */
const fetchData = async (resetPage = true) => {
  let params = getQueryParams()
  emit('fetch', params)
  if (props.fetch) return props.fetch(params)

  if (!props.api || !configStore.proTableRequestMethod || props.data) return

  loading.value = true

  if (resetPage) {
    query.page = 1
  }

  const res = await configStore.proTableRequestMethod(params).finally(() => {
    loading.value = false
  })
  const { total, data, statistics: _statistics } = res

  if (_statistics) {
    statistics.value = _statistics
  }

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

const exposed = {
  state,
  fetchData,
  props,
  /** 获取查询参数 */
  getQueryParams,
  find,
  deleteRow,
  toggleRowSelection: (row: any, selected: boolean) =>
    tableRef.value?.toggleRowSelection(row, selected)
}

provide(proTableContextKey, exposed)

defineExpose(exposed)
</script>
