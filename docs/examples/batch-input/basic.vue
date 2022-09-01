<template>
  <el-form :data="form">
    <el-batch-input
      span="max"
      placeholder="新增一个"
      label="批量输入测试"
      field="arr"
      v-slot="{ item }"
    >
      <el-input placeholder="key" v-model="item.value1" />
      &nbsp;
      <el-input placeholder="value" v-model="item.value2" />
    </el-batch-input>
  </el-form>

  <div>
    {{ form.arr }}
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue'

const form = shallowReactive({
  arr: [{ value1: 'test' }]
})
</script>
