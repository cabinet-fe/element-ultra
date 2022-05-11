<template>
  <el-radio-group v-model="mode">
    <el-radio value="inline">行内</el-radio>
    <el-radio value="dialog">弹框</el-radio>
  </el-radio-group>

  <el-multiple-form
    :data="data"
    :mode="mode"
    :columns="columns"
    title="标题"
    height="400px"
    @change="c.log"
  >
    <!-- 行内编辑时 -->
    <template #name="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
    </template>

    <template #age="{ row }">
      <el-input-number :min="1" v-model="row.age" placeholder="年龄" />
    </template>

    <template #school="{ row }">
      <el-input v-model="row.school"></el-input>
    </template>

    <!-- 弹框编辑时 -->
    <template>
      <el-input label="名称" field="name"></el-input>
      <el-input label="年龄" field="age"></el-input>
      <el-input label="学校" field="school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type { MultipleFormColumn } from 'element-ultra'
import { shallowRef } from 'vue'

const mode = shallowRef<'inline' | 'dialog'>('inline')

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

let data = shallowRef<any[]>([
  { name: '张三', age: 20, school: '清华' },
  { name: '李四', age: 22, school: '北大' }
])

const c = console
</script>
