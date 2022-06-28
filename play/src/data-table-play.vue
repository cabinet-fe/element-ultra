<template>
  <el-data-table :columns="columns" :data="data"> </el-data-table>
</template>

<script lang="ts" setup>
import type { DataTableColumn } from '@element-ultra/components'

const columns: DataTableColumn[] = [
  { name: '测试', key: 'test' },
  { name: '测试1', key: 'test1' },
  {
    name: '测试2',
    key: 'test2',
    children: [
      {
        name: '测试2-1',
        key: 'test2-1',
        children: [
          { name: '测试2-1-1', key: 'test2-1-1' },
          { name: '测试2-1-2', key: 'test2-1-2' },
          { name: '测试2-1-3', key: 'test2-1-3' },
        ]
      },
      { name: '测试2-2', key: 'test2-2' },
      { name: '测试2-3', key: 'test2-3' },
    ]
  },
  { name: '测试3', key: 'test3' },
]

const data = Array.from({ length: 100 }).map(() => {
  return {
    test: '测试',
    test1: '测试1',
    'test2-1': '测试2-1',
    'test2-2': '测试2-2',
    test3: '测试3'
  }
})
</script>
