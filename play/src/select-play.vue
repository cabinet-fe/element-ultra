<template>
  <el-checkbox v-model="multiple">是否多选</el-checkbox>

  <el-select
    :options="options1"
    label-key="text"
    value-key="id"
    v-model="model.value1"
    allow-create
    filterable
    :multiple="multiple"
  >
  </el-select>
  {{ model.value1 }}

  <el-select
    :options="options2"
    filterable
    allow-create
    value-key="value"
    :multiple="multiple"
    v-model="model.value2"
  />
  {{ model.value2 }}
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'

const options1 = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  text: '文本' + (index + 1)
}))

const options2 = [
  // { label: '选项3', value: '选项3' },
  // { label: '选项4', value: '选项4' }
]

const multiple = shallowRef(true)

const model = reactive({
  value1: [1, 2],
  value2: ['选项1', '选项2']
})
</script>
