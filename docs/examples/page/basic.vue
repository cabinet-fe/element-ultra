<template>
  <el-page ref="pageRef" style="height: 400px">
    <template #footer="{ extraRefs }">
      <el-button @click="handleValidate">校验</el-button>
    </template>

    <el-card v-for="i in 5" :header="`标题${i}`">
      <el-form :data="data" :rules="rules" :cols="1">
        <el-input
          v-for="(_, f) in fieldLength"
          :field="'field' + f"
          :label="'控件' + f"
        ></el-input>
      </el-form>
    </el-card>
  </el-page>
</template>

<script setup lang="ts">
import {  useFormModel, PageInstance } from 'element-ultra'
import { shallowRef } from 'vue'

const fieldLength = 20
const pageRef = shallowRef<PageInstance>()
const [data, rules] = useFormModel(
  Array.from({ length: fieldLength }).reduce(
    (acc: Record<string, any>, _, i) => {
      acc['field' + i] = { required: true }
      return acc
    },
    {}
  )
)

const handleValidate = async () => {
  await pageRef.value?.validate()
  // 校验失败控制台不会打印
  console.log('success')
}
</script>
