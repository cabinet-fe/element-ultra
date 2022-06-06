<template>
  <el-dialog :width="width" :class="ns.b()" v-model="visible" :title="title">
    <div :class="ns.e('searcher')">
      <div :class="ns.e('wrapper')">
        <slot name="searcher"></slot>
      </div>
      <div :class="ns.e('btn')" v-if="query && Object.keys(query).length">
        <el-button type="primary" @click="fetchData">查询</el-button>
      </div>
    </div>
    <TableSelectDisplay
      :theight="theight"
      :data="data || tableData"
      :value="props.value"
      editable
      ref="tableRef"
    />
    <el-pagination
      :class="ns.e('pagination')"
      v-if="api && rootProps.pagination"
      v-model:currentPage="pageQuery.page"
      v-model:page-size="pageQuery.size"
      @change="fetchData"
      :page-sizes="[20, 40, 80, 100, 150, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
    >
    </el-pagination>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  shallowRef,
  watch,
  inject,
  ref,
  toRefs,
  shallowReactive,
  computed
} from 'vue'
import { ElDialog } from '@element-ultra/components/dialog'
import { ElButton } from '@element-ultra/components/button'
import { ElPagination } from '@element-ultra/components/pagination'
import { useNamespace, useConfig } from '@element-ultra/hooks'
import { tableSelectDialogProps } from './table-select-dialog'
import TableSelectDisplay from './table-select-display.vue'
import { tableSelectKey } from './token'

let visible = ref<boolean>(false)

const props = defineProps(tableSelectDialogProps)

const { title, theight } = toRefs(props)

const ns = useNamespace('table-select-dialog')

const tableRef = shallowRef<InstanceType<typeof TableSelectDisplay>>()

const emit = defineEmits<{
  (e: 'change', data: Record<string, any>[] | Record<string, any>): void
  (e: 'apiData', data: Record<string, any>[]): void
}>()

const { rootProps } = inject(tableSelectKey)!

const pageQuery = shallowReactive({
  page: 1,
  size: 20
})

let totalSize = shallowRef(0)

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

const handleCancel = () => {
  tableRef.value?.clear()
  close()
}

const handleSubmit = () => {
  const data = tableRef.value?.getValue()
  if (!data) {
    return console.warn('没有选择数据')
  }
  emit('change', data)
  close()
}

let tableData = ref<any[]>()

const [configStore] = useConfig()

let loading = shallowRef(false)

const fetchData = async () => {
  const { api } = rootProps
  if (!configStore.tableSelectRequestMethod || !api) return
  const { query } = props
  let realQuery = Object.keys(query || {}).reduce((acc, cur) => {
    let v = query![cur]
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
        ...realQuery,
        ...pageQuery
      }
    })
    .finally(() => {
      loading.value = false
    })

  if (total) {
    totalSize.value = total
  }
  tableData.value = data
  emit('apiData', data)
}

let queryWatchList = computed(() => {
  return Object.keys(props.query || {})
    .filter(k => k.startsWith('$'))
    .map(k => {
      return () => props.query?.[k]
    })
})

watch(queryWatchList, fetchData)

watch(() => rootProps.api, fetchData, { immediate: true })

defineExpose({
  open
})
</script>
