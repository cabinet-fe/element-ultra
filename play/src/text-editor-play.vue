<template>
  <el-button @click="updateContent">更新内容</el-button>
  <el-text-editor v-model="a" :disabled="false" />
  {{a}}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

let a = $shallowRef('<p>123</p>')

const updateContent = () => {
  a = `<p>${Math.random()}</p>` 
}
</script>
