<template>
  <el-table-select
    v-model="data"
    :columns="columns"
    :multiple="true"
    pagination
    :show-index="true"
    :query="query"
    api="/test/table/select"
    :dialog-title="dialogTitle"
    ref="tableRef"
    :editable="true"
    :table="true"
    :path="path"
    value-key="code"
    :column-filter="columnFilter"
  >
    <el-button type="primary" :icon="Plus">自定义按钮</el-button>

    <template #searcher>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <!-- <el-input v-model="query.name" /> -->
      <el-date-picker v-model="query.$date" clearable />
    </template>
  </el-table-select>
</template>

<script lang="ts" setup>
import { shallowReactive, onMounted, shallowRef } from 'vue'
import type { TableSelectColumn } from 'element-ultra'
import { Plus } from '@element-plus/icons-vue'

const query = shallowReactive({
  name: '',
  $date: ''
})

const columnFilter = (column: TableSelectColumn) => {
  return !['remarks', 'department', 'status', 'summary'].includes(column.key)
}

const tableRef = shallowRef()

const fixed_columns: TableSelectColumn[] = [
  {
    key: 'code',
    name: '明细指标编码',
    render: ({ val }) => {
      return val?.substring(0, 8) || null
    }
  },
  { key: 'summary', name: '摘要' },
  { key: 'summary', name: '摘要', align: 'center' },
  { key: 'summary', name: '摘要', align: 'right' },
  { key: 'project', name: '项目', width: 300 },
  {
    key: 'status',
    name: '状态'
  },
  { key: 'remarks', name: '备注', slot: 'column-remarks' },
  { key: 'department', name: '部门', width: 160 }
]

let extra_columns: TableSelectColumn[] = $ref([])

let columns = $computed<TableSelectColumn[]>(() => {
  return [...fixed_columns, ...extra_columns]
})

let data = shallowRef([
  { code: 'BM100001',  summary: `摘要1`,  project: `项目1` },
  { code: 'BM100002',  summary: `摘要2`,  project: `项目2` },
  { code: 'BM100003',  summary: `摘要3`,  project: `项目3` },
  { code: 'BM100004',  summary: `摘要4`,  project: `项目4` }
])

let path = $ref('')

let dialogTitle = '弹框标题'

onMounted(() => {
  setTimeout(() => {
    extra_columns = [
      {
        key: 'frozenAmount',
        name: '当前已冻结金额(元)',
        width: 150
      },
      {
        key: 'balance',
        name: '可冻结金额(元)',
        width: 130
      },
      {
        key: 'newForzenAmount',
        name: '本次冻结金额(元)',
        width: 140
      },
      { key: 'frozenRemark', name: '冻结备注', minWidth: 100 }
    ]
  }, 1000)
})
</script>
