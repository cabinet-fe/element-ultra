<template>
  <el-button
    @click="
      open('create', {
        title: '新增'
      })
    "
    >新增</el-button
  >

  <el-button
    @click="
      open('update', {
        title: '编辑',
        data: [{ name: '张三', type: '2', school: '清华', age: 1 }, { test: '' }]
      })
    "
    >编辑</el-button
  >

  <div>{{ data }}</div>

  <el-form-dialog :title="dialog.title" v-model="dialog.visible" :confirm="confirm">
    <el-form :cols="{ cols: 3, xs: 1, s: 2 }" :data="data" :rules="rules">
      <el-radio-group field="type" label="类型">
        <el-radio value="1">名称</el-radio>
        <el-radio value="2">学校</el-radio>
      </el-radio-group>

      <el-input-number field="age" label="年龄"></el-input-number>

      <el-input v-if="data.type === '1'" key="1" field="name" label="名称" />

      <el-input v-else type="password" key="2" field="school" label="学校" tips="输入一个学校" />

      <el-textarea field="name" label="副文本" span="max"></el-textarea>

      <el-tree-select key="111" :data="treeData" field="node1" label="单选" />

      <el-tree-select :data="treeData" field="node2" label="多选" multiple />
    </el-form>

    <el-form :data="data2" :rules="rules2">
      <el-input field="test" />
    </el-form>
  </el-form-dialog>
</template>

<script setup lang="ts">
import { useFormDialog, useFormModel } from 'element-ultra'
const [data, rules] = useFormModel({
  name: {
    required: true,
    validator(v) {
      if (v && v.length < 3) {
        return new Promise(rs => {
          setTimeout(() => {
            rs('名称长度不能小于3')
          }, 1000)
        })
      }
      return ''
    }
  },
  school: { required: true },
  type: { value: '1' },
  age: {},
  node1: { value: '' },
  node2: { value: [] }
})

let treeData = $shallowRef<any[]>([])
setTimeout(() => {
  treeData = Array.from({ length: 10 }).map((_, index) => {
    return {
      label: `文本${index}`,
      value: `${index}`,
      children: Array.from({ length: Math.round(Math.random() * 2) }).map((_, childIndex) => {
        return {
          label: `文本${index}-${childIndex}`,
          value: `${index}-${childIndex}`
        }
      })
    }
  })
}, 1000)

const [data2, rules2] = useFormModel({
  test: {}
})

const [dialog, open] = useFormDialog([data, data2])

const confirm = () => {
  return new Promise(rs => {
    setTimeout(() => {
      rs('成功')
    }, 2000)
  })
}
</script>
