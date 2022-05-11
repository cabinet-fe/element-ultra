<template>
  <el-button @click="handleView">打开并回显</el-button>
  <div>data1: {{ data1 }}</div>
  <div>data2: {{ data2 }}</div>

  <el-form-dialog v-model="dialog.visible" :title="dialog.title">
    <el-form :data="data1">
      <el-input field="test1" />
    </el-form>

    <el-form :data="data2">
      <el-input field="test2" />
    </el-form>
  </el-form-dialog>
</template>

<script setup lang="ts">
import { useFormDialog, useFormModel } from 'element-ultra'

const [data1] = useFormModel({
  test1: {}
})
const [data2] = useFormModel({
  test2: {}
})

const [dialog, open] = useFormDialog([data1, data2])

const handleView = () => {
  open('update', {
    data: [
      { test1: '测试1' },
      { test2: '测试2' },
    ]
  })
}
</script>
