<template>
  <el-table :data="data" style="height: 400px;" :columns="columns">
    <template #aa="{ row }">
      {{ row }}
    </template>
  </el-table>
</template>

<script lang="ts" setup>

import { computed } from '@vue/reactivity'
import { template } from 'lodash'
import type { TableColumn } from 'element-ultra'
import { shallowRef } from 'vue'

const count = shallowRef(10)

const xings =
  '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章'
const mings = '啊行者三四里华琴浩杰龙晨勉国爱葱飞鹏婷'

const columns: TableColumn[] = [
  { name: '姓名', key: 'name', width: 200, fixed: 'left' },
  { name: 'id', key: 'id', summary: ({ total }) => total },
  { name: '姓名1', key: 'name1', slot: 'aa' },
  { name: '姓名2', key: 'name2', render: ({ row }) => row.name },
  { name: '姓名3', key: 'name3', render: ({ row }) => row.name },
  { name: '姓名4', key: 'name4', render: ({ row }) => row.name },
  {
    name: '姓名5',
    fixed: 'right',
    key: 'name5',
    render: ({ row }) => row.name,
    minWidth: 200
  }
]

const data = computed(() => {
  return Array.from({ length: count.value }).map((_, i) => {
    const xing = xings[~~(Math.random() * xings.length)]
    const ming = mings[~~(Math.random() * mings.length)]
    return {
      name: xing + ming + i,
      id: i,
      children: [
        {
          name: '你好' + i + '-1',
          id: i + '-1',
          children: [{ name: '你好' + i + '-1-1', id: i + '-1-1' }]
        },
        { name: '你好' + i + '-2', id: i + '-2' }
      ]
    }
  })
})


</script>

<style>
.flex {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  box-sizing: border-box;
  /* padding: 20px; */
  border: 1px solid #ccc;
}

.flex div {
  height: 20px;
  background-color: #ccc;
}
</style>
