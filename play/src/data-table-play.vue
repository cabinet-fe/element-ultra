<template>
  <div class="count">
    <label>数据量</label>
    <el-input-number :precision="0" v-model="count" style="width: 200px" />
  </div>
  <el-data-table
    show-index
    checkable
    :columns="columns"
    :data="data"
    show-summary
    height="100%"
  >
    <template #test1="{ row }">
      <el-button link type="primary">{{ row.name }}</el-button>
    </template>

    <template #test2="{ row }">
      {{ row.name }}
    </template>
  </el-data-table>
</template>

<script lang="tsx" setup>
import type { DataTableColumn } from '@element-ultra/components'
import { computed } from '@vue/reactivity'
import { shallowRef } from 'vue'

const columns: DataTableColumn[] = [
  {
    name: '测试2',
    key: 'test2',
    children: [
      {
        name: '测试2-1',
        key: 'test2-1',
        fixed: 'left',

        children: [
          { name: '测试2-1-1', key: 'test2-1-1', slot: 'test2',  align: 'center' },
          { name: '测试2-1-2', key: 'test2-1-2', slot: 'test2' },
          { name: '测试2-1-3', key: 'test2-1-3', slot: 'test2' }
        ]
      },
      {
        name: '测试2-2',
        key: 'test2-2',
        children: [
          { name: '测试3-1-1', key: 'test3-1-1', slot: 'test2' },
          { name: '测试3-1-2', key: 'test3-1-2', slot: 'test2' },
          { name: '测试3-1-3', key: 'test3-1-3', slot: 'test2' }
        ]
      },
      { name: '测试2-3', key: 'test2-3', slot: 'test2' }
    ]
  },
  {
    name: () => <span style='color: red'>姓名</span>,
    key: 'name',
    align: 'center',
    fixed: 'left',
    width: 200,
    sortable: true
  },
  { name: '测试1', key: 'test1', slot: 'test1' },

  { name: '测试3', key: 'test3', slot: 'test2', fixed: 'right', width: 100 }
]

const count = shallowRef(3000)

const xings =
  '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章'
const mings = '啊行者三四里华琴浩杰龙晨勉国爱葱飞鹏婷'

const data = computed(() => {
  return Array.from({ length: count.value }).map((_, i) => {
    const xing = xings[~~(Math.random() * xings.length)]
    const ming = mings[~~(Math.random() * mings.length)]
    return {
      name: xing + ming + i,
      id: i
    }
  })
})
</script>

<script lang="tsx">
export default {
  inheritAttrs: false
}
</script>
<style>
.count {
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
</style>
