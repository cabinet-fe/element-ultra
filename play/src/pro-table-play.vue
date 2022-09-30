<template>
  <el-pro-table
    height="100%"
    pagination
    row-key="id"
    :api="api"
    :query="query"
    :columns="columns"
    show-index
    :checkable="(_, index) => index % 2 === 0"
    ref="tableRef"
    show-summary
    @checked="c.log"
  >
    <template #searcher>
      <el-input placeholder="名称" v-model="query.name" />
      <el-input v-for="item of list" :placeholder="item.label" />
      <!-- <span></span> -->
      <!-- <el-date-picker
        placeholder="起止日期"
        type="daterange"
        v-model="query.$date"
      />
      <el-input
        style="width: 200px"
        v-for="(_, i) in 9"
        :placeholder="`测试${i}`"
      /> -->
    </template>

    <template #action>
      <el-action-group>
        <el-action>编辑</el-action>
        <el-action>删除</el-action>
      </el-action-group>
    </template>

    <template #tools>
      <el-button type="primary" @click="createSearcher">新增</el-button>
      <el-button @click="c.log(columns)">打印列数据</el-button>
      <el-button @click="handleClick">改变query</el-button>
      <el-button @click="handleFix">固定列</el-button>
      <el-dropdown trigger="click" split-button type="primary">
        按钮123
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 13</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-pro-table>
</template>

<script setup lang="tsx">
import { ElButton } from 'element-ultra'
import { isReactive, provide, shallowReactive, shallowRef } from 'vue'

provide('aa', { name: 'aa' })

// 查询
const query = shallowRef(
  shallowReactive({
    name: '',
    $date: ['2022-02-14', '2022-08-03']
  })
)

const tableRef = shallowRef()

const reactiveColumnItem = (columns: any[]) => {
  let ret: any[] = []
  columns.forEach(column => {
    let item = isReactive(column) ? column : shallowReactive(column)
    if (column.children) {
      item.children = reactiveColumnItem(column.children)
    }
    ret.push(item)
  })
  return ret
}

const columns = reactiveColumnItem([
  {
    name: '姓名',
    key: 'name',
    children: [
      { name: 'child', key: 'money', preset: 'money' },
      { name: 'child2', key: 'child2' }
    ]
  },

  {
    name: '钱',
    key: 'money',
    preset: 'money',
    sortable: true,
    width: 100,
    align: 'center'
  },
  {
    name: '姓名',
    key: 'name1',
    sortable: true
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
  {
    name: '操作',
    align: 'center',
    key: 'action',
    fixed: 'right',
    width: 150,
    slot: 'action'
  }
])

const handleFix = () => {
  const column = columns[1]
  if (column.fixed === 'left') {
    column.fixed = 'right'
  } else if (column.fixed === 'right') {
    delete column.fixed
  } else {
    column.fixed = 'left'
  }
}

const api = shallowRef('')

const list = shallowRef<any[]>([])
const createSearcher = () => {
  list.value = [...list.value, { label: '测试' }]
}

setTimeout(() => {
  api.value = '/some/test'
}, 1500)

const handleClick = () => {
  query.value = shallowReactive({
    name: '',
    $date: []
  })
}
</script>
