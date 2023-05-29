<template>
  <el-checkbox v-model="multiple">是否多选</el-checkbox>

  <el-select
    :options="options1"
    label-key="text"
    value-key="id"
    v-model="model.value1"
    @update:model-value="c.log"
    allow-create
    filterable
    :multiple="multiple"
  >
  </el-select>
  {{ model.value1 }}
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'

const options1 = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  text: '文本' + (index + 1)
}))

const multiple = shallowRef(false)

const model = reactive({
  value1: undefined
})
</script>
