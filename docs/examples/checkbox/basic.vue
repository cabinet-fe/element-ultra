<template>
  <div>
    <el-checkbox v-model="checked1" value="Option 1" size="large"></el-checkbox>
    <el-checkbox v-model="checked2" value="Option 2" size="large"></el-checkbox>
  </div>
  <div>
    <el-checkbox v-model="checked3" value="Option 1"></el-checkbox>
    <el-checkbox v-model="checked4" value="Option 2"></el-checkbox>
  </div>
  <div>
    <el-checkbox v-model="checked5" value="Option 1" size="small"></el-checkbox>
    <el-checkbox v-model="checked6" value="Option 2" size="small"></el-checkbox>
  </div>
  <div>
    <el-checkbox
      v-model="checked5"
      value="Option 1"
      size="small"
      disabled
    ></el-checkbox>
    <el-checkbox
      v-model="checked6"
      value="Option 2"
      size="small"
      disabled
    ></el-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
</script>
