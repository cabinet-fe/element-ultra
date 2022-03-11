<template>
  <el-pro-table
    height="500px"
    pagination
    show-index
    api="/some/text"
    :query="query"
    :columns="columns"
  >
    <template #searcher>
      <!-- TODO这个长度要改进, 暂时先这么着 -->
      <el-input style="width: 180px;" placeholder="姓名" v-model="query.$name" />
      <el-input style="width: 180px;" placeholder="编码" v-model="query.code" />
    </template>

    <template #tools>
      <el-button type="primary">新增</el-button>
    </template>
  </el-pro-table>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'

// 查询
const query = shallowReactive({
  // 注意$符号, 表示该属性被实时监听自动让表格发起请求
  // 在控制台查看效果, 最终发到后端的是不带$前缀的
  $name: '',
  code: '',
})

const columns: any[] = [
  {
    name: '姓名',
    key: 'name',
    prop: 'name',
  },
  {
    name: '年龄',
    key: 'age',
    prop: 'age',
  },
]
</script>
