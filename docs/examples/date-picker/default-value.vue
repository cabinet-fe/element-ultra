<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">日期</span>
      <el-date-picker
        v-model="value1"

        :default-value="new Date(2010, 9, 1)"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">日期范围</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color-base);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
