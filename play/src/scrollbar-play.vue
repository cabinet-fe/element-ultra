<template>
  <el-button @click="handleChange('add')">增加行</el-button>
  <el-button @click="handleChange('minus')">减少行</el-button>
  <el-scrollbar style="width: 404px; height: 400px; border: 1px solid #ccc">

    <div style="width: 500px">
      <p v-for="i of counts" :key="i">
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
      </p>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'

const counts = shallowRef(20)

const handleChange = (type: 'add' | 'minus') => {
  if (type === 'add') {
    counts.value++
  } else {
    counts.value--
    counts.value < 0 && (counts.value = 0)
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
</style>
