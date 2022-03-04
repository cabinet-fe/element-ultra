<template>
  <el-textarea v-model="textarea1" autosize />
  <div style="margin: 20px 0"></div>
  <el-textarea v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textarea1 = ref('')
const textarea2 = ref('')
</script>
