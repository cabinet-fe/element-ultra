<template>
  <el-grid :cols="['200px', '1fr']">
    <div>111</div>

    <el-pro-table
      height="100%"
      pagination
      row-key="id"
      api="/some/text"
      :query="query"
      :columns="columns"
      show-index
      :checkable="
        (row, index) => {
          return index % 2 === 0
        }
      "
      ref="tableRef"
    >
      <template #searcher>
        <el-input v-model="query.$name" />
      </template>

      <template #age="{ row }">
        {{ row }}
      </template>

      <template #tools>
        <el-button type="primary">新增</el-button>
        <el-button
          @click="
            tableRef.tableRef.toggleRowSelection(
              {
                name: '张三',
                id: 1,
                age: 20
              },
              true
            )
          "
          >切换选中</el-button
        >
      </template>
    </el-pro-table>
  </el-grid>
</template>

<script setup lang="tsx">
import { type ProTableColumn, ElButton } from 'element-ultra'
import { shallowReactive, shallowRef } from 'vue'

// 查询
const query = shallowRef(
  shallowReactive({
    $name: ''
  })
)

setTimeout(() => {
  query.value = shallowReactive({
    $name: ''
  })
}, 1200)

let columns: ProTableColumn[] = $shallowRef([])

const tableRef = shallowRef()

setTimeout(() => {
  columns = [
    {
      name: '姓名',
      key: 'name',
      width: 400
    },
    {
      name: '年龄',
      key: 'age',
      width: 300,
      slot: 'age' // 建议使用column-*这样的命名, 方便在模板里面阅读
    },
    {
      name: '操作',
      align: 'center',
      key: 'action',
      fixed: 'right',
      width: 300,
      render(row, index) {
        return (
          <>
            <ElButton>新增</ElButton>
            <ElButton>编辑</ElButton>
          </>
        )
      }
    }
  ]
}, 1000)
</script>
