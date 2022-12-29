<template>
  <div class="layout">
    <!-- 导航栏 -->
    <LayoutNav />

    <div>
      <!-- 侧边栏 -->
      <LayoutSideBar />

      <!-- 内容栏 -->
      <LayoutContent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutNav from './layout/nav.vue'
import LayoutSideBar from './layout/side-bar.vue'
import LayoutContent from './layout/content.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
