<template>
  <el-edit-bar
    sortable
    @create="onCreate"
    @delete="onDelete"
    style="background-color: #fff; height: 300px"
    :data="data"
    value-key="time"
  >
  </el-edit-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let data = ref([{ label: 0, time: Date.now() }])

const onCreate = () => {
  data.value.push({ label: data.value.length, time: Date.now() })
}

const onDelete = (v: any) => {
  data.value = data.value.filter((item) => item.time !== v)
}
</script>
