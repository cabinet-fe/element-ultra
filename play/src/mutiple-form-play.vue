<template>
  <el-multiple-form
    :editable="true"
    :data="data"
    :columns="columns"
    @save="onSave"
    @delete="onDelete"
  >
    <template #default="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
      <el-input-number :min="1" v-model="row.age" placeholder="单价" />
      <el-input v-model="row.school" placeholder=""></el-input>

      <el-input v-model="row.name" placeholder="名称" />
      <el-input-number :min="1" v-model="row.age" placeholder="单价" />
      <el-input v-model="row.school" placeholder=""></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import { left, right } from '@popperjs/core'
import type { MultipleColumns } from 'element-ultra'

const columns: MultipleColumns[] = [
  {
    name: '姓名',
    key: 'name',
    rules: {
      required: [true, '必填']
    },
    width: 200,
    align: left
  },
  {
    name: '年龄',
    key: 'age',
    rules: {
      required: [true, '必填'],
      min: 2,
      max: 6
    },
    align: 'left',
    width: 200
  },
  {
    name: '学校',
    key: 'school',
    rules: {
      required: true
    },
    width: 150
  },
  {
    name: '姓名',
    key: 'name',
    rules: {
      required: [true, '必填']
    },
    width: 200,
    align: left
  },
  {
    name: '年龄',
    key: 'age',
    rules: {
      required: [true, '必填'],
      min: 2,
      max: 6
    },
    align: 'left',
    width: 200
  },
  {
    name: '学校',
    key: 'school',
    rules: {
      required: true
    }
  }
]

let data = $ref<any[]>([
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
])

/** 保存 */
const onSave = (row: any) => {
  console.log('保存成功, 数据是：', row)
}

/** 删除 */
const onDelete = (row: any) => {
  console.log(row, 'row_删除')
  console.log('删除')
}
</script>

<style lang="scss" scoped></style>
