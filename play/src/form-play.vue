<template>
  <div style="padding: 8px">
    {{ data }}
  </div>

  <el-form ref="formRef" :cols="{ cols: 2 }" :data="data" :rules="rules">
    <component
      :is="ElTextarea"
      v-bind="{
        label: '文本域',
        field: 'area'
      }"
    />
  </el-form>

  <el-button @click="formRef.validate()">校验</el-button>
</template>

<script setup lang="ts">
import { useFormModel, ElTextarea } from 'element-ultra'
import { shallowRef } from 'vue'
document.title = '表单测试'

const [data, rules] = useFormModel({
  name: {
    required: true,
    value: ''
  },
  test: { required: true },

  type: { value: '2' },
  aa: {},
  area: { required: true }
})

const formRef = shallowRef<any>()
</script>
