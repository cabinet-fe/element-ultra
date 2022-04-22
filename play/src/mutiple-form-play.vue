<template>
  <el-multiple-form
    :data="data"
    :columns="columns"
    title="标题"
    height="400px"
    @change="onChange"
    @save="onSave"
  >
    <template #tools>
      <el-button type="primary" @click="addNextLine">添加一行</el-button>
    </template>

    <template #name="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
    </template>

    <template #age="{ row }">
      <el-input-number :min="1" v-model="row.age" placeholder="单价" />
    </template>

    <template #school="{ row }">
      <el-input v-model="row.school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type { MultipleFormColumn } from 'element-ultra'

const columns: MultipleFormColumn[] = [
  {
    name: '名称',
    key: 'name',
    rules: {
      required: true
    },
    align: 'center'
  },
  {
    name: '年龄',
    key: 'age',
    rules: {
      required: true,
      min: 2
    },
    defaultValue: 12,
    align: 'left'
  },
  {
    name: '手机号',
    key: 'school',
    rules: {
      required: true
    }
  }
]

let data = $ref<any[]>([
  { name: '6216616101002312625', age: 20, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' }
])

/** 保存 */
const onSave = (row: any) => {
  console.log('保存成功, 数据是：', row)
}

const onChange = (rows: any) => {
  console.log(`rows`, rows)
}

/** 增加下一行 */
const addNextLine = (row: any) => {
  console.log(row, 'row_增加')
}
</script>
