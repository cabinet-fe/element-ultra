<template>
  <el-table-select v-model="multipleData" :columns="columns" :data="treeData" :multiple="multiple">
    <el-button type="primary" :icon="Plus">选择</el-button>
  </el-table-select>
  <div>singleData: {{ singleData }}</div>
  <div>multipleData: {{multipleData}}</div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

const treeData = $ref([
  { name: '张三', score: 57, id: 1 },
  { name: '李四', score: 87, id: 2 },
  { name: '王五', score: 36, id: 3 }
])
const columns = $ref([
  { key: 'name', name: '名字' },
  { key: 'score', name: '成绩' }
])

let singleData = $ref({})

let multipleData = $ref([{ name: '李四', score: 87, id: 2 }])

let multiple = $ref<boolean>(true)
</script>
