<template>
  <el-table-select
    v-model="singleData"
    :columns="columns"
    :data="tableData"
  >
    <el-button type="primary">单选</el-button>
  </el-table-select>
  <el-table-select
    v-model="multipleData"
    :columns="columns"
    :data="tableData"
    multiple
    show-index
  >
    <el-button type="primary">多选</el-button>
  </el-table-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const columns = ref([
  { key: 'name', name: '名字' },
  { key: 'date', name: '日期' },
  { key: 'address', name: '地址', width: 300 }
])

let singleData = ref({
  date: '2016-05-03',
  name: 'Bob',
  address: 'No. 189, Grove St, Los Angeles',
  id: 1
})

let multipleData = ref([
  {
    date: '2016-05-03',
    name: 'Bob',
    address: 'No. 189, Grove St, Los Angeles',
    id: 1
  }
])

const tableData = ref([
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
</script>
