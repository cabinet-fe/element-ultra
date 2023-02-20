<template>
  <el-button @click="updateContent">更新内容</el-button>
  <el-text-editor style="margin: 8px" v-model="a" mode="simple" :include="[
    'todo', 'bulletedList', 'numberedList', 'insertLink', '|', 'undo', 'redo', 'fullScreen'
  ]"  :disabled="false" />
  {{a}}
</template>

<script setup lang="ts">

let a = $shallowRef('<p>你好</p>')

const updateContent = () => {
  a = `<p>${Math.random()}</p>`
}
</script>
