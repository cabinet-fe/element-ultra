<template>
  <el-button @click="visible = true">打开</el-button>

  <el-form-dialog
    width="700px"
    title="这是一个弹框"
    v-model="visible"
    :confirm="confirm"
  >
    <el-form :data="data" :rules="rules">
      <el-radio-group field="type" label="类型">
        <el-radio label="1">名称</el-radio>
        <el-radio label="2">学校</el-radio>
      </el-radio-group>

      <template key="1" v-if="data.type === '1'">
        <el-input field="name" label="名称" tips="输入一个名称" />
      </template>
      <template v-else>
        <el-input field="school" label="学校" tips="输入一个学校" />
      </template>
    </el-form>
  </el-form-dialog>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'
import { ref } from 'vue'
const [data, rules] = useFormModel({
  name: { required: true },
  school: { required: true },
  type: { value: '1' },
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
