<template>
  <el-radio-group v-model="mode">
    <el-radio value="inline">行内编辑</el-radio>
    <el-radio value="dialog">弹框编辑</el-radio>
    <el-radio value="direct">直接编辑</el-radio>
  </el-radio-group>

  <el-checkbox v-model="disabled">禁用</el-checkbox>

  <el-multiple-form
    :mode="mode"
    :columns="columns"
    title="标题"
    v-model:data="data"
    ref="refer"
    style="height: 400px"
    :save-method="handleSave"
    :delete-method="handleDelete"
    :action-width="200"
    sortable
    :tree="tree"
    :disabled="disabled"
  >
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

    <template #default="{ form }">
      <el-form-item label="名称">{{ form.name }}</el-form-item>
      <el-input label="名称" field="name"></el-input>
      <el-input-number label="年龄" field="age"></el-input-number>
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

const mode = shallowRef<'inline' | 'dialog' | 'direct'>('dialog')

const tree = shallowRef(true)

const disabled = shallowRef(false)

const columns: MultipleFormColumn[] = [
  {
    name: '名称',
    key: 'name',
    tips: '这是一个tip<br>aa<br>bbb',
    defaultValue: '111',
    rules: {
      validator(v) {
        return /^\d+$/.test(v) ? '' : '应该是数字'
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
  {
    name: 'asdfasf',
    school: '213',
    age: 123,
    test: {},
    bol: false,
    children: [{ name: 'asdf', school: '321', age: 321, test: {}, bol: false }]
  },

  { name: '沃尔特条', school: '33', age: 44, test: {}, bol: false },
  { name: '沃尔特条2', school: '233', age: 244, test: {}, bol: false }
])

const visible = shallowRef(false)

const refer = shallowRef<InstanceType<typeof ElMultipleForm>>()
/** 增加下一行 */
const addNextLine = (row: any) => {
  if (mode.value === 'dialog') {
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

const handleSave: MultipleFormSaveMethod = async ctx => {
  return new Promise(rs => {
    setTimeout(() => {
      rs({
        ...ctx.data,
        id: Math.random()
      })
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
