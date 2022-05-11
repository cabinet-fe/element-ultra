<template>
  <el-table-select
    v-model="multipleData"
    :columns="columns"
    :data="tableData"
    :multiple="multiple"
    pagination
    :show-index="true"
    :query="query"
    dialog-title="弹框标题"
  >
    <el-button type="primary" :icon="Plus">自定义按钮</el-button>

    <template #searcher>
      <el-input v-model="query.name" />
      <el-input v-model="query.name" />
      <el-input v-model="query.name" />
      <el-input v-model="query.name" />
      <el-date-picker
        v-model="query.$date"
        clearable
      />
    </template>

    <template #action>
      <el-button type="primary" @click="handleClick">详情</el-button>
    </template>
  </el-table-select>

  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" name="Date" />
    <el-table-column prop="name" label="Name" name="Name" />
    <el-table-column prop="address" label="Address" name="Address" />
  </el-table> -->
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue'
import type { ProTableColumn } from 'element-ultra';
import { Plus } from '@element-plus/icons-vue'

// const columns = $ref([
//   { key: 'name', name: '名字' },
//   { key: 'date', name: '日期' },
//   { key: 'address', name: '地址' }
// ])
const columns: ProTableColumn[] = $ref([
  { key: 'code', name: '明细指标编码', width: 160, render: (_,__,v) => {
    return v?.substring(0,8) || null
  } },
  { key: 'summary', name: '摘要' },
  {
    key: 'status',
    name: '状态'
  },
  { key: 'remarks', name: '备注' },
  { key: 'department', name: '部门', width: 160 },
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
  { key: 'frozenRemark', name: '冻结备注' },
  { key: 'action', name: '操作', slot: 'column-action' }
])

let singleData = $ref({id: 2})

let multipleData = $ref([{id: 3}, {id: 5}])

let multiple = $ref<boolean>(true)

const tableData = $ref([
  {
    code: '2016-05-03',
    summary: 'Bob',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 1
  },
  {
    code: '2016-05-02',
    summary: 'Tom',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 2
  },
  {
    code: '2016-05-04',
    summary: 'John',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 3
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 4
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 5
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 6
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 7
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 8
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 9
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 10
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 11
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 12
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 13
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 14
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 15
  },
  {
    code: '2016-05-01',
    summary: 'Tomy',
    remarks: 'No. 189, Grove St, Los Angeles',
    id: 16
  },
])

const query = shallowReactive({
  name: '',
  $date: ''
})

const handleClick = () => {
  console.log('cccc')
}
</script>
