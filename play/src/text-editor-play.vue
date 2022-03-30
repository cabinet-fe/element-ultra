<template>
  <el-text-editor v-model="a" :disabled="false" @onChange="changes"></el-text-editor>
</template>

<script setup lang="ts">
import { onMounted,ref } from "vue";

let a = ref('123')

const changes = (row: any) => {
  console.log(row,'row')
}
</script>
