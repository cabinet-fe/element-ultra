<template>
  <div :class="[ns.b(), $attrs.class]" :style="{ height }">
    <section ref="searcherRef" v-if="$slots.searcher" :class="ns.e('searcher')">
      <div :class="ns.e('searcher-box')">
        <slot name="searcher" />
      </div>

      <el-button text>展开/隐藏</el-button>
    </section>

    <section ref="toolsRef" v-if="$slots.tools || showTools" :class="ns.e('tools')">
      <div :class="ns.e('tools-left')">
        <slot name="tools" />
      </div>
      <div :class="ns.e('tools-right')">
        <el-button type="primary" @click="fetchData">查询</el-button>
      </div>
    </section>

    <el-table :data="computedData" v-if="columns.length" v-bind="$attrs" :height="tableHeight">
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
        <template v-if="column.slot" #default="scope">
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
      small
      layout="total, prev, pager, next,  sizes, jumper"
      :total="state.total"
      :page-sizes="pageSizes"
    />
  </div>
</template>
<script lang="ts" setup>
import ElTable from '@element-ultra/components/table'
import ProTableColumn from './pro-table-column.vue'
import { ElTableColumn } from '@element-ultra/components/table'
import { proTableProps } from './pro-table'
import usePreColumns from './use-pre-columns'
import ElPagination from '@element-ultra/components/pagination'
import ElButton from '@element-ultra/components/button'
import { computed, shallowReactive, watch, shallowRef, onMounted } from 'vue'
import { useConfig, useNamespace } from '@element-ultra/hooks'

defineOptions({
  name: 'ElProTable',
  inheritAttrs: false,
})

const ns = useNamespace('pro-table')

const props = defineProps(proTableProps)

const [configStore] = useConfig()

const pageSizes = [20, 40, 60, 120, 200]

const query = shallowReactive({
  page: 1,
  size: configStore.proTableDefaultSize || 20,
})

const state = shallowReactive({
  total: 0,
  data: [] as any[],
})

const computedData = computed(() => {
  return props.data || state.data
})

//  计算表格高度
const searcherRef = shallowRef<HTMLDivElement | null>(null)
const toolsRef = shallowRef<HTMLDivElement | null>(null)
const tableHeight = shallowRef<string | undefined>(undefined)
const calcTableHeight = () => {
  if (!props.height) return
  let subtilized = [searcherRef, toolsRef].reduce((acc, cur) => {
    if (cur.value?.offsetHeight) {
      acc += cur.value.offsetHeight + 6 // 6是margin-bottom的值
    }
    return acc
  }, 0)

  if (props.pagination) {
    subtilized += 28
  }
  tableHeight.value = `calc(${props.height} - ${subtilized}px)`
}
onMounted(() => {
  calcTableHeight()
})

const fetchData = async () => {
  if (!props.api || !configStore.proTableRequestMethod || props.data) return

  let realQuery = Object.keys(props.query || {}).reduce((acc, cur) => {
    let v = props.query![cur]
    if (cur.startsWith('$')) {
      cur = cur.slice(1)
    }
    acc[cur] = v
    return acc
  }, {} as Record<string, any>)

  const { total, data } = await configStore.proTableRequestMethod({
    api: props.api,
    query: {
      ...(props.pagination ? query : null),
      ...realQuery,
    },
  })
  if (total) {
    state.total = total
  }
  state.data = data
}

// hack行为, 在属性名前面加上$表示该表格自动根据该属性的变化过滤数据
let queryWatchList = Object.keys(props.query || {})
  .filter((k) => k.startsWith('$'))
  .map((k) => {
    return () => props.query?.[k]
  })

watch([query, ...queryWatchList], fetchData)
fetchData()

const preColumns = usePreColumns(props)

const find = () => {
  return computedData.value
}

const deleteRow = (index: number) => {
  state.data = [...state.data.slice(0, index), ...state.data.slice(index + 1)]
}

defineExpose({
  fetchData,
  find,
  deleteRow
})
</script>
