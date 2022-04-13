<template>
  <el-table-select v-model="data"></el-table-select>
</template>

<script lang="ts" setup>
const data = $ref([{a: 1, b: 2, c: 3}])
</script>
