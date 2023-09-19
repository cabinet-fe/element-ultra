<template>
  {{ form.arr }}
  <el-form :data="form" :rules="rules" ref="formRef">
    <el-batch-input
      span="max"
      :item-default="{ value1: 'aa' }"
      placeholder="aa"
      label="批量输入测试"
      field="arr"
      v-slot="{ item }"
      :allow-add="false"
    >
      <el-input v-model="item.value1" />
      <el-input v-model="item.value2" />
      <el-input v-model="item.value3" />
    </el-batch-input>
  </el-form>

  <el-button @click="formRef.validate()">校验</el-button>
</template>

<script lang="ts" setup>
import { useFormModel } from '@element-ultra/components'
import { shallowRef } from 'vue'
const formRef = shallowRef()
const [form, rules] = useFormModel({
  arr: {
    value: [{ value1: '的萨芬都是' }],
    required: true
  }
})
</script>
