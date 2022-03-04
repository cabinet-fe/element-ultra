<template>
  <div class="demo-input-size">
    <el-input v-model="input1" class="w-50 m-2" size="large" />
    <el-input v-model="input2" class="w-50 m-2" />
    <el-input v-model="input3" class="w-50 m-2" size="small" />
  </div>
  <div class="demo-input-size">
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      :suffix-icon="Search"
    />
    <el-input v-model="input2" class="w-50 m-2" :suffix-icon="Search" />
    <el-input
      v-model="input3"
      class="w-50 m-2"
      size="small"
      :suffix-icon="Search"
    />
  </div>
  <div class="demo-input-size">
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      :prefix-icon="Search"
    />
    <el-input v-model="input2" class="w-50 m-2" :prefix-icon="Search" />
    <el-input
      v-model="input3"
      class="w-50 m-2"
      size="small"
      :prefix-icon="Search"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
