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
        data: { name: '张三', type: '2', school: '清华' }
      })
    "
    >编辑</el-button
  >

  <div>{{ data }}</div>

  <el-form-dialog width="700px" :title="dialog.title" v-model="dialog.visible" :confirm="confirm">
    <el-form :data="data" :rules="rules">
      {{ data }}
      <el-radio-group field="type" label="类型">
        <el-radio label="1">名称</el-radio>
        <el-radio label="2">学校</el-radio>
      </el-radio-group>

      <el-input v-if="data.type === '1'" key="1" field="name" label="名称" tips="输入一个名称" />
      <el-input v-else type="password" key="2" field="school" label="学校" tips="输入一个学校" />
    </el-form>
  </el-form-dialog>
</template>

<script setup lang="ts">
import { useFormDialog, useFormModel } from 'element-ultra'
const [data, rules] = useFormModel({
  name: { required: true },
  school: { required: true },
  type: { value: '1' }
})

const [dialog, open] = useFormDialog(data)

const confirm = () => {
  return new Promise((rs) => {
    setTimeout(() => {
      rs('成功')
    }, 2000)
  })
}
</script>
