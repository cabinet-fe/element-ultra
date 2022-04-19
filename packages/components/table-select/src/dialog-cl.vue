<template>
  <el-dialog v-model="visible">
    <TableCl
      :data="tableData ? tableData : data"
      :columns="columns"
      :value="value"
      checkable
      ref="tableRef"
    />
    <el-pagination
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
import { ElDialog, ElButtonGroup, ElButton, ElPagination } from '@element-ultra/components'
import { useNamespace } from '@element-ultra/hooks'
import { shallowRef, watch, inject, ref } from 'vue'
import { dialogClProps } from './dialog-cl'
import TableCl from './table-cl.vue'
import { Http } from 'fe-dk'

let visible = ref<boolean>(false)

const props = defineProps(dialogClProps)

const { data, columns, api } = props

const ns = useNamespace('dialog-cl')

const tableRef = shallowRef()

const emits = defineEmits<{
  (e: 'change', data: Record<string, any>[]): void
}>()

// pagination
let pagination = inject('pagination')
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

const http = new Http({
  timeout: 18000
})

let tableData = ref(null)

const fetchData = (api: string) => {
  http
    .get(api, {
      params: {
        current: currentPage,
        size: pageSize
      }
    })
    .then((res) => {
      const { code, data } = res
      if (code !== 200) return
      tableData = data.records
      totalSize = data.total
    })
}

watch(
  () => props.api,
  (cur, pre) => {
    cur ? fetchData(cur) : void 0
  },
  {
    immediate: true
  }
)

defineExpose({
  open
})
</script>
