<template>
  <el-input-number v-model="num" :min="1" :max="10000" @change="handleChange" />
  <br/><br/>
  <el-input-number v-model="num" :min="1" money :max="10000" @change="handleChange" />
  <br/><br/>
  <el-input-number v-model="num" :min="1" :max="10000" append="平方" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1234)
const handleChange = (value?: number) => {
  console.log(value)
}
</script>
