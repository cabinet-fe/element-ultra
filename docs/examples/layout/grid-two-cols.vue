<template>
  <div>
    间隔
    <el-slider v-model="yGap" :min="0" :max="24" />
  </div>

  <el-grid
    class="box"
    tag="ul"
    :gap="`0,${yGap}`"
    style="height: 200px"
    :cols="['200px', '1fr']"
  >
    <li class="item"></li>
    <li class="item"></li>
  </el-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let yGap = ref(4)
</script>

<style>
.box {
  padding: 0;
  margin: 0;
  width: 100%;
}
.item {
  background-color: #d3dce6;
  list-style: none;
}
</style>
