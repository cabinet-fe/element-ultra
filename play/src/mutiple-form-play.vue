<template>
  <el-multiple-form :editable="true" :data="data" :columns="columns">
    <template #default="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
      <el-input-number :min="1" v-model="row.age" placeholder="年龄" />
      <el-input v-model="row.school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type { MultipleColumns } from '@element-ultra'

const columns: MultipleColumns[] = [
  {
    name: '姓名',
    key: 'name',
    rules: {
      required: [true, '必填'],
    },
  },
  {
    name: '年龄',
    key: 'age',
    rules: {
      required: [true, '必填'],
      min: 2,
      max: 6,
    },
  },
  {
    name: '学校',
    key: 'school',
    rules: {
      required: true,
    },
  },
]

let data = $ref<any[]>([
  { name: '张三', age: 20, school: '苏大' },
  { name: '葛慧', age: 18, school: '北大' },
  { name: '谢超', age: 18, school: '清华' },
])
</script>

<style lang="scss" scoped></style>
