<template>
  {{ form.arr }}
  <el-form :data="form">
    <el-batch-input placeholder="aa" label="批量输入测试" field="arr" v-slot="{ item }">
      <el-input v-model="item.value1" />
      <el-input v-model="item.value2" />
    </el-batch-input>
  </el-form>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue'

const form = shallowReactive({
  arr: [
    // { value1: 'test' }
  ]
})
</script>
