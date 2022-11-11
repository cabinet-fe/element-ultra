<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" type="daterange"> </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">
        多个字段绑定(start和end必须同时绑定, 否则不生效)
      </span>
      <span class="demonstration">{{ form }}</span>
      <el-date-picker
        v-model:start="form.start"
        v-model:end="form.end"
        type="daterange"
      >
      </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">快捷选项</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        :shortcuts="shortcuts"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { date } from 'cat-kit'

const value1 = ref('')
const value2 = ref('')

const form = reactive({
  start: date().format(),
  end: date().calc(10, 'days').format(),
})

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()

      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近90天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
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
