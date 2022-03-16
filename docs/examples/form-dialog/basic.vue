<template>
  <el-button @click="visible = true">打开</el-button>

  <el-form-dialog title="这是一个弹框" v-model="visible" :confirm="confirm">
    <el-form :data="data" :rules="rules">
      <el-input field="name" label="名称" tips="输入一个名称" />
    </el-form>
  </el-form-dialog>
</template>

<script setup lang="ts">
import  { useFormModel } from 'element-ultra'
import { ref } from 'vue'
const [data, rules] = useFormModel({
  name: { required: true }
})

const visible = ref(false)

const confirm = () => {
  return new Promise((rs) => {
    setTimeout(() => {
      rs('成功')
      console.log(data)
    }, 2000)
  })
}
</script>