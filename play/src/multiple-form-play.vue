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
    @change="onChange"
    @save="onSave"
  >
    <template #tools>
      <el-button type="primary" @click="addNextLine">添加一行</el-button>
    </template>

    <template #name:view="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
    </template>

    <template #name="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
    </template>

    <template #age="{ row }">
      <el-input-number :min="1" v-model="row.age" placeholder="年龄" />
    </template>

    <template #school="{ row }">
      <el-input v-model="row.school"></el-input>
    </template>
    <template #test="{ row }">
      <el-input v-model="row.test.test1"></el-input>
      <el-input v-model="row.test.test2"></el-input>
    </template>

    <template #default="{ form }">
      <el-form-item label="名称">{{ form.name }}</el-form-item>
      <el-input label="名称" field="name"></el-input>
      <el-input label="年龄" field="age"></el-input>
      <el-input label="学校" field="school"></el-input>
      <el-input label="测试1" field="test.test1" />
      <el-input label="测试2" field="test.test2" />
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type { MultipleFormColumn } from 'element-ultra'

const mode = $shallowRef<'inline' | 'dialog'>('inline')

const columns: MultipleFormColumn[] = [
  {
    name: '名称',
    key: 'name',
    tips: '这是一个tip<br>aa<br>bbb',
    rules: {
      validator(v) {
        return /^\d+$/.test(v) ? '' : '应该是数字\n嘿嘿黑黑黑黑黑黑'
      }
    },
    align: 'center'
  },
  {
    name: '年龄',
    key: 'age',
    defaultValue: () =>
      new Promise(rs =>
        setTimeout(() => {
          rs(20)
        }, 2000)
      ),
    align: 'left'
  },
  {
    name: '手机号',
    key: 'school',
    rules: {
      required: true
    }
  },
  {
    key: 'test',
    name: '美滋滋',
    defaultValue: () => ({}),
    nest: [
      { key: 'test1', name: '对象测试1' },
      { key: 'test2', name: '对象测试2' }
    ]
  }
]

let data = $shallowRef<any[]>([
  { name: '6216616101002312625', age: 20, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' }
])

/** 保存 */
const onSave = (row: any) => {}

const onChange = (rows: any) => {}

/** 增加下一行 */
const addNextLine = (row: any) => {}
</script>
