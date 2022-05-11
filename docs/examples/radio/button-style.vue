<template>
  <div>
    <el-radio-group v-model="radio1" size="large">
      <el-radio-button value="New York"></el-radio-button>
      <el-radio-button value="Washington"></el-radio-button>
      <el-radio-button value="Los Angeles"></el-radio-button>
      <el-radio-button value="Chicago"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio2">
      <el-radio-button value="New York"></el-radio-button>
      <el-radio-button value="Washington"></el-radio-button>
      <el-radio-button value="Los Angeles"></el-radio-button>
      <el-radio-button value="Chicago"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio3" size="small">
      <el-radio-button value="New York"></el-radio-button>
      <el-radio-button value="Washington" disabled></el-radio-button>
      <el-radio-button value="Los Angeles"></el-radio-button>
      <el-radio-button value="Chicago"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('New York')
const radio2 = ref('New York')
const radio3 = ref('New York')
</script>
