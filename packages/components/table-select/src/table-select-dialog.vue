<template :class="ns.b()">
  <el-dialog v-model="visible" :title="title">
    <div :class="ns.e('searcher')">
      <div :class="ns.e('wrapper')">
        <slot name="searcher"></slot>
      </div>
      <div :class="ns.e('btn')" v-if="query && Object.keys(query).length">
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
    </div>
    <div :class="ns.e('table')">
      <TableSelectDisplay
      :data="tableData ? tableData : data"
      :columns="columns.filter(column=>column.key !== 'action')"
      :value="value"
      checkable
      ref="tableRef"
    />
    </div>
    <el-pagination
      :class="ns.e('pagination')"
      v-if="api && pagination"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 40, 80, 100, 150, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <template #footer>
      <el-button-group>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-button-group>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { shallowRef, watch, inject, ref, shallowReactive } from 'vue'
import { ElDialog } from '@element-ultra/components/dialog'
import { ElButtonGroup, ElButton } from '@element-ultra/components/button'
import { ElPagination } from '@element-ultra/components/pagination'
import { useNamespace, useConfig } from '@element-ultra/hooks'
import { tableSelectDialogProps } from './table-select-dialog'
import TableSelectDisplay from './table-select-display.vue'
import { paginationKey } from './token'

let visible = ref<boolean>(false)

const props = defineProps(tableSelectDialogProps)

const { data, columns, api, query, title } = props

const ns = useNamespace('table-select-dialog')

const tableRef = shallowRef()

const emits = defineEmits<{
  (e: 'change', data: Record<string, any>[]): void,
  (e: 'apiData', data: Record<string, any>[]): void
}>()

// pagination
let pagination = inject(paginationKey)
let currentPage = ref(1)
let pageSize = ref(20)
let totalSize = ref(400)
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchData(api)
}
const handleCurrentChange = (current: number) => {
  currentPage.value = current
  fetchData(api)
}

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

const handleCancel = () => {
  tableRef.value.clear()
  close()
}

const submit = () => {
  const data = tableRef.value.getValue()
  emits('change', data)
  close()
}

let tableData = ref<any>(null)

// api
const handleSearch = () => {
  fetchData(api)
}

const [configStore] = useConfig()

let loading = shallowRef(false)

const fetchData = async (api: string) => {
  if (!configStore.tableSelectRequestMethod) return

  let realQuery = Object.keys(props.query || {}).reduce((acc, cur) => {
    let v = props.query![cur]
    if (cur.startsWith('$')) {
      cur = cur.slice(1)
    }
    acc[cur] = v
    return acc
  }, {} as Record<string, any>)

  const { total, data } = await configStore
    .tableSelectRequestMethod({
      api,
      query: {
        ...realQuery
      }
    })
    .finally(() => {
      loading.value = false
    })

    if (total) {
    totalSize.value = total
  }
  console.log(data,'data')
  tableData.value = data
  emits('apiData', data)
}

let queryWatchList = Object.keys(props.query || {})
  .filter(k => k.startsWith('$'))
  .map(k => {
    return () => props.query?.[k]
  })

watch(
  [...queryWatchList],
  (cur, pre) => {
    fetchData(api)
  }
)

watch(
  () => props.api,
  (cur, pre) => {
    cur && fetchData(cur)
  },
  {
    immediate: true
  }
)

defineExpose({
  open
})
</script>
