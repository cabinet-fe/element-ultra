<template>
  <el-table-select
    v-model="singleData"
    :columns="columns"
    :data="tableData"
    :multiple="multiple"
    :api="`/admin/dept/tree`"
    pagination
    :show-index="true"
    :query="query"
  >
    <el-button type="primary" :icon="Plus">自定义按钮</el-button>

    <template #searcher>
      <el-input v-model="query.name" />
      <el-date-picker
        v-model="query.$date"
        clearable
      />
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
import { Plus } from '@element-plus/icons-vue'

const columns = $ref([
  { key: 'name', name: '名字' },
  { key: 'date', name: '日期' },
  { key: 'address', name: '地址' }
])

let singleData = $ref({
  date: '2016-05-03',
  name: 'Bob',
  address: 'No. 189, Grove St, Los Angeles',
  id: 1
})

let multipleData = $ref([
  {
    date: '2016-05-03',
    name: 'Bob',
    address: 'No. 189, Grove St, Los Angeles',
    id: 1
  }
])

let multiple = $ref<boolean>(false)

const tableData = $ref([
  {
    date: '2016-05-03',
    name: 'Bob',
    address: 'No. 189, Grove St, Los Angeles',
    id: 1
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id: 2
  },
  {
    date: '2016-05-04',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    id: 3
  },
  {
    date: '2016-05-01',
    name: 'Tomy',
    address: 'No. 189, Grove St, Los Angeles',
    id: 4
  }
])

const query = shallowReactive({
  name: '',
  $date: ''
})
</script>
