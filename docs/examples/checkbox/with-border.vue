<template>
  <div>
    <el-checkbox
      v-model="checked1"
      value="Option1"
      size="large"
      border
    ></el-checkbox>
    <el-checkbox
      v-model="checked2"
      value="Option2"
      size="large"
      border
    ></el-checkbox>
  </div>
  <div class="mt-4">
    <el-checkbox v-model="checked3" value="Option1" border></el-checkbox>
    <el-checkbox v-model="checked4" value="Option2" border></el-checkbox>
  </div>
  <div class="mt-4">
    <el-checkbox-group v-model="checkboxGroup1" size="small">
      <el-checkbox value="Option1" border></el-checkbox>
      <el-checkbox value="Option2" border></el-checkbox>
    </el-checkbox-group>
  </div>
  <div class="mt-4">
    <el-checkbox-group v-model="checkboxGroup1" size="small">
      <el-checkbox value="Option1" border disabled></el-checkbox>
      <el-checkbox value="Option2" border disabled></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(true)
const checkboxGroup1 = ref(['Option1'])
</script>
