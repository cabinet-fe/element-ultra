<template>
  <el-pro-table
    height="100%"
    pagination
    row-key="id"
    api="/some/text"
    :query="query"
    :columns="columns"
  >
    <template #searcher>
      <el-input v-model="query.name" />
    </template>

    <template #age="{ row }">
      {{row}}
    </template>

    <template #tools>
      <el-button type="primary">新增</el-button>
    </template>
  </el-pro-table>
</template>

<script setup lang="tsx">
import { type ProTableColumn, ElButton } from 'element-ultra'
import { shallowReactive } from 'vue'

// 查询
const query = shallowReactive({
  name: '',
})

const columns: ProTableColumn[] = [
  {
    name: '姓名',
    key: 'name',
  },
  {
    name: '年龄',
    key: 'age',
    slot: 'age' // 建议使用column-*这样的命名, 方便在模板里面阅读
  },
  {
    name: '操作',
    align: 'center',
    key: 'action',
    render(row, index) {
      return (
        <>
          <ElButton>新增</ElButton>
          <ElButton>编辑</ElButton>
        </>
      )
    },
  },
]
</script>
