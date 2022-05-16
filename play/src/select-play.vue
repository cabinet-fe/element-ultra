<template>
  <div>
    <div>单选 {{ model.value1 }}</div>
    <el-select
      :options="options1"
      label-key="text"
      value-key="id"
      v-model="model.value1"
    >
    </el-select>
  </div>

  <div>
    <div>多选 {{ model.value2 }}</div>
    <el-select
      filterable
      :options="options1"
      allow-create
      :reserve-keyword="false"
      clearable
      label-key="text"
      value-key="id"
      multiple
      v-model="model.value2"
    >
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const options1 = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  text: '文本' + (index + 1)
}))

const model = reactive({
  value1: undefined,
  value2: undefined
})
</script>
