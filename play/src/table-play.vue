<template>
  <el-table :data="data" :columns="columns"> </el-table>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@element-ultra/element-ultra'
import { computed } from '@vue/reactivity'
import { shallowRef } from 'vue'

const count = shallowRef(50)

const xings =
  '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章'
const mings = '啊行者三四里华琴浩杰龙晨勉国爱葱飞鹏婷'

const columns: TableColumn[] = [
  { name: '姓名', key: 'name', minWidth: 200,  fixed: 'left' },
  { name: '姓名', key: 'name1', minWidth: 200 },
  { name: '姓名', key: 'name2', minWidth: 200 },
  { name: '姓名', key: 'name3', minWidth: 200 },
  { name: '姓名', key: 'name4', minWidth: 200 },
  { name: '姓名', key: 'name5', minWidth: 200 },
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
