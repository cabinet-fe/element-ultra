<template>
  <el-pro-table
    height="100%"
    pagination
    row-key="id"
    api="/some/text"
    :query="query"
    :columns="columns"
    show-index
    :checkable="(_, index) => index % 2 === 0"
    ref="tableRef"
  >
    <template #searcher>
      <el-input placeholder="名称" v-model="query.name" />
      <!-- <span></span> -->
      <el-date-picker
        placeholder="起止日期"
        type="daterange"
        v-model="query.$date"
      />
      <el-input
        style="width: 200px"
        v-for="(_, i) in 9"
        :placeholder="`测试${i}`"
      />
    </template>

    <template #age="{ row }">
      {{ row }}
    </template>

    <template #action>
      <el-action-group>
        <el-action>编辑</el-action>
        <el-action>删除</el-action>
      </el-action-group>
    </template>

    <template #tools>
      <el-button type="primary">新增</el-button>

      <el-button @click="handleClick">改变query</el-button>

      <el-dropdown split-button type="primary" >
      按钮123
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 134</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </template>
  </el-pro-table>
</template>

<script setup lang="tsx">
import { type ProTableColumn, ElButton } from 'element-ultra'
import {  provide, shallowReactive, shallowRef } from 'vue'

provide('aa', { name: 'aa' })

// 查询
const query = shallowRef(
  shallowReactive({
    name: '',
    $date: ['2022-02-14', '2022-08-03']
  })
)

let columns: ProTableColumn[] = $shallowRef([])

const tableRef = shallowRef()

setTimeout(() => {
  columns = [
    {
      name: '姓名',
      key: 'name',
      fixed: 'left',
      children: [
        { name: 'child', key: 'child1' },
        { name: 'child2', key: 'child2' }
      ]
    },
    {
      name: '钱',
      key: 'money',
      preset: 'money',
      fixed: 'left',
      width: 100
    },
    {
      name: '姓名',
      key: 'name1'
    },
    {
      name: '姓名',
      key: 'name2'
    },
    {
      name: '姓名',
      key: 'name3'
    },
    {
      name: '姓名',
      key: 'name4'
    },
    {
      name: '姓名',
      key: 'name5'
    },
    {
      name: '姓名',
      key: 'name6'
    },
    {
      name: '姓名',
      key: 'name7'
    },
    // {
    //   name: '姓名',
    //   key: 'name'
    // },
    // {
    //   name: '姓名',
    //   key: 'name'
    // },
    // {
    //   name: '姓名',
    //   key: 'name'
    // },
    // {
    //   name: '父级',
    //   key: 'parent',
    //   children: [
    //     {
    //       name: '年龄',
    //       key: 'age',
    //       slot: 'age' // 建议使用column-*这样的命名, 方便在模板里面阅读
    //     }
    //   ]
    // },
    {
      name: '操作',
      align: 'center',
      key: 'action',
      fixed: 'right',
      width: 150,
      slot: 'action'
    }
  ]
}, 500)

const handleClick = () => {
  query.value = shallowReactive({
    name: '',
    $date: []
  })
}
</script>
