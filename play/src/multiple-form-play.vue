<template>
  <el-radio-group v-model="mode">
    <el-radio value="inline">行内</el-radio>
    <el-radio value="dialog">弹框</el-radio>
  </el-radio-group>

  <el-color-picker />

  <el-multiple-form
    :mode="mode"
    :columns="columns"
    title="标题"
    v-model:data="data"
    ref="refer"
    tree
    style="height: 400px"
    :save-method="handleSave"
    :delete-method="handleDelete"
    :action-width="200"
  >
    <template #action:view-mode="{ data }">
      123
    </template>

    <template #tools>
      <el-button type="primary" @click="addNextLine">添加一行</el-button>
      <el-button @click="refer?.validate()">校验</el-button>
    </template>

    <template #name="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
    </template>

    <template #bol="{ row }">
      <el-checkbox v-model="row.bol" />
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
      <el-checkbox label="布尔" field="bol" />
      <el-input label="学校" field="school"></el-input>
      <el-input label="测试1" field="test.test1" />
      <el-input label="测试2" field="test.test2" />
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type {
  ElMultipleForm,
  MultipleFormColumn,
  MultipleFormSaveMethod,
  MultipleFormDeleteMethod
} from 'element-ultra'
import { shallowRef } from 'vue'

const mode = $shallowRef<'inline' | 'dialog'>('dialog')

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
    defaultValue: () => 20,
    align: 'left',
    summary: true
  },
  {
    name: '手机号',
    key: 'school',
    defaultValue: 2,
    rules: {
      required: true
    }
  },
  { name: '布尔值', key: 'bol', defaultValue: true },
  {
    key: 'test',
    name: '美滋滋',
    width: 100,
    defaultValue: () => ({}),
    nest: [
      { key: 'test1', name: '对象测试1' },
      { key: 'test2', name: '对象测试2' }
    ]
  }
]

let data = $shallowRef<any[]>([
  { name: 'asdfasf', school: '213', age: 123, test: {}, bol: false }
])

const refer = shallowRef<InstanceType<typeof ElMultipleForm>>()
/** 增加下一行 */
const addNextLine = (row: any) => {
  if (mode === 'dialog') {
    refer.value?.open('create', {
      ctx: {
        indexes: [0]
      }
    })
  } else {
    refer.value?.insertTo(
      0,
      { name: '123', age: ~~(50 * Math.random()) },
      'view'
    )
  }
}

const handleSave: MultipleFormSaveMethod = async ({ type, parent }) => {
  await new Promise(rs => {
    setTimeout(() => {
      rs(true)
    }, 1000)
  })
}

const handleDelete: MultipleFormDeleteMethod = async ({ data, saved }) => {
  if (!saved) return

  return new Promise(rs => {
    setTimeout(() => {
      rs(true)
    }, 1000)
  })
}
</script>
