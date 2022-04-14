<template>
  <div>默认响应式布局断点如下</div>
  <div>0 xs 540px s 768px m 1280px l 1536px xl 1920px xxl</div>

  <div>
    xs: <el-input-number v-model="cols.xs" placeholder="xs" /> s:
    <el-input-number v-model="cols.s" placeholder="s" />
  </div>
  <div>
    m: <el-input-number v-model="cols.m" placeholder="m" /> l:
    <el-input-number v-model="cols.l" placeholder="l" />
  </div>

  <div>
    xl: <el-input-number v-model="cols.xl" placeholder="xl" /> xxl:
    <el-input-number v-model="cols.xxl" placeholder="xxl" />
  </div>

  <div>当前容器宽度 {{ width }}</div>

  <el-grid @resize="handleResize" :cols="cols">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </el-grid>
</template>

<script lang="ts" setup>
import { shallowRef, shallowReactive } from 'vue'

const cols = shallowReactive({
  cols: 2,
  xs: 1,
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
  xxl: 5
})
let width = shallowRef(0)
const handleResize = (rect: DOMRectReadOnly) => {
  width.value = rect.width
}
</script>

<style scoped>
.item {
  line-height: 40px;
  text-align: center;
  background-color: #99a9bf;
}
</style>
