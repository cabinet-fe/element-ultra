<template>
  <el-textarea v-model="textarea" :rows="2" />
  <br /><br />
  <el-textarea v-model="textarea" disabled />
  <br /><br />
  <el-textarea v-model="textarea" show-word-limit maxlength="10" />
  <br /><br />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const textarea = ref('')
</script>
