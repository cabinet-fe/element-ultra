<template>
  <el-result icon="error" title="找不到资源" sub-title="请求的页面不存在。">
    <template #extra>
      <el-button @click="goHome">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
const goHome = () => {
  window.location.href = `/`
}
</script>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
