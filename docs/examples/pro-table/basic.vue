<template>
  <div>
    <el-input-number placeholder="默认查询控件数量" v-model="limit" :min="2" max="5" />

    <el-pro-table
      height="500px"
      pagination
      show-index
      checkable
      api="/some/text"
      :query="query"
      :columns="columns"
      show-expand
      default-expand-all
      :searcher-limit="limit"
    >
      <template #searcher>
        <el-input
          style="width: 180px"
          placeholder="姓名"
          v-model="query.$name"
        />
        <el-input
          style="width: 180px"
          placeholder="编码"
          v-model="query.code"
        />

        <el-input placeholder="测试1" />
        <el-input placeholder="测试2" />
        <el-input placeholder="测试3" />
      </template>

      <template #tools>
        <el-button type="primary">新增</el-button>
      </template>

      <template #row-expand> 展开行内容 </template>
    </el-pro-table>
  </div>
</template>

<script setup lang="ts">
import { shallowReactive, shallowRef } from 'vue'
import type { ProTableColumn } from 'element-ultra'

// 查询
const query = shallowReactive({
  // 注意$符号, 表示该属性被实时监听自动让表格发起请求
  // 在控制台查看效果, 最终发到后端的是不带$前缀的
  $name: '',
  code: ''
})

let limit = shallowRef(2)

const columns: ProTableColumn[] = [
  {
    name: '姓名',
    key: 'name'
  },
  {
    name: '年龄',
    key: 'age'
  }
]
</script>
