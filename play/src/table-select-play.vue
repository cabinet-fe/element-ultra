<template>
  <el-button @click="data = v1">值1</el-button>
  <el-button @click="data = v2">值2</el-button>
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
    :editable="false"
    value-key="code"
    :column-filter="columnFilter"
    clearable
    :row-disabled="(row, rowIndex) => rowIndex % 2 === 0"
  >
    <template #searcher>
      <el-input v-model="query.name" />
      <el-date-picker v-model="query.$date" clearable />
    </template>

    <template #action="scope">
      {{ scope }}
    </template>
  </el-table-select>

  {{ data }}
</template>

<script lang="ts" setup>
import { shallowReactive, onMounted, shallowRef } from 'vue'
import type { TableSelectColumn } from 'element-ultra'

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
  { key: 'department', name: '部门', width: 160 },
  {
    key: 'action',
    slot: 'action',
    name: '操作',
    fixed: 'right',
    align: 'center',
    width: 160
  }
]

let extra_columns: TableSelectColumn[] = $ref([])

let columns = $computed<TableSelectColumn[]>(() => {
  return [...fixed_columns, ...extra_columns]
})

let data = shallowRef([])

const v1 = [
  { code: 'BM10001', summary: '摘要1', project: '项目1' },
  { code: 'BM10002', summary: '摘要2', project: '项目2' }
]

const v2 = []

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
