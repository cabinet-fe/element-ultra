<template>
  <div :class="[ns.b(), $attrs.class]" :style="{ height }">
    <!-- 表格工具栏 -->
    <ProTableTools
      v-if="toolsVisible"
      @key-enter="fetchData()"
      @search="fetchData"
      @tools-resize="calcTableHeight"
    >
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
      :height="tableHeight"
      :data="computedData"
      :columns="columns"
      :show-summary="summaryVisible"
      :summary-method="computedSummaryMethod"
      :show-index="showIndex"
      :checkable="checkable"
      :selectable="selectable"
      :checked="checked"
      :selected="selected"
      :tree="tree"
      @check="emit('check', $event)"
      @select="emit('select', $event)"
      @row-click="handleRowClick"
      @sort="handleSort"
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
import {
  computed,
  shallowReactive,
  watch,
  shallowRef,
  useSlots,
  provide,
  onMounted
} from 'vue'

import {
  ElDataTable,
  DataTableInstance
} from '@element-ultra/components/data-table'
import ProTableTools from './pro-table-tools'
import { proTableProps, proTableEmits, ProTableColumn } from './pro-table'
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

const columnSlots = computed(() => {
  let leafColumns: ProTableColumn[] = []
  const recursive = (columns?: ProTableColumn[]) => {
    columns?.forEach(column => {
      if (column.children?.length) return recursive(column.children)
      leafColumns.push(column)
    })

  }
  recursive(props.columns)

  return leafColumns.filter(column => column.slot)
})

const tableRef = shallowRef<DataTableInstance>()

const toolsVisible = computed(() => {
  return (slots.tools || slots.searcher) && props.showTools
})

const [configStore] = useConfig()

const pageSizes = [20, 60, 120, 200, 1000]

const pageQuery = shallowReactive({
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

// 参数相关逻辑--------------------------------------------
let sortKeys: Record<string, 'asc' | 'dsc' | 'default'> | undefined = undefined
const handleSort = (_sortKeys: Record<string, 'asc' | 'dsc' | 'default'>) => {
  sortKeys = _sortKeys
  fetchData(false)
}

const getUrlParams = () => {
  return location.search.replace('?', '').split('&').reduce((acc, item) => {
    const [key, val] = item.split('=')
    acc[decodeURIComponent(key)] = decodeURIComponent(val)
    return acc
  }, {} as Record<string, any>)
}

const valueMap: Record<string, (v: string) => any> = {
  number: (v: string) => +v,
  array: (v: string) => v.split(','),
}

const getQueryParams = () => {
  let _query = {
    ...props.query,
    ...(props.pagination ? pageQuery : null)
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
    query: realQuery,
    extra: props.requestExtra,
    sortKeys
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

/** location历史替换 */
function historyReplace(query: Record<string, any>) {
  let ret = ''
  Object.keys(query).forEach(key => {
    if (query[key] === undefined) {
      return ret += `${key}=&`
    }
    ret += `${key}=${encodeURIComponent(query[key])}&`
  })

  history.replaceState({}, '', location.pathname + `?${ret.slice(0, -1)}`)
}

let loading = shallowRef(false)

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
    pageQuery.page = 1
  }

  historyReplace(params.query)

  const res = await configStore.proTableRequestMethod(params).finally(() => {
    loading.value = false
  })
  const { total, data, statistics: _statistics } = res

  if (_statistics) {
    statistics.value = _statistics
  }

  if (total || total === 0) {
    state.total = total
  }
  state.data = data

  emit('loaded', res)
}

let canAutoQuery = shallowRef(true)

let defaultQuery = { value: {} }
/** 设置自动请求 */
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

    // 在最开始的时候获取默认query的值
    defaultQuery.value = {...propQuery}

    // 在监听query之前读取
    if (props.cacheParams) {
      let cachedParams = getUrlParams()

      Object.keys(propQuery).forEach(key => {
        let cachedVal = cachedParams[key]
        if (cachedVal) {
          let originType = Object.prototype.toString.call(propQuery[key]).slice(8, -1).toLowerCase()
          propQuery[key] = valueMap[originType] ? valueMap[originType](cachedVal) : cachedVal
        }
      })

      if (cachedParams.page) {
        pageQuery.page = +cachedParams.page
      }
      if (cachedParams.size) {
        pageQuery.size = +cachedParams.size
      }
    }

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

const handleRowClick = (row: any, index: number) => {
  emit('row-click', row, index)
}

watch(
  () => props.api,
  () => fetchData(),
  { immediate: true }
)

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
  loading,
  defaultQuery
})

const exposed = {
  state,
  fetchData,
  props,
  /** 获取查询参数 */
  getQueryParams,
  find,
  deleteRow,
  getColumns: () => tableRef.value?.getColumns() || []
}

provide(proTableContextKey, exposed)

defineExpose(exposed)
</script>
