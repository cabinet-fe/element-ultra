<template>
  <div class="demo-range">
    <el-time-picker
      v-model="value1"
      is-range
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    >
    </el-time-picker>
    <el-time-picker
      v-model="value2"
      is-range
      arrow-control
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    >
    </el-time-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])
const value2 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])
</script>

<style>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
