<template>
<el-tabs hide-content v-model="active">
  <el-tab-pane name="a"></el-tab-pane>
  <el-tab-pane name="b"></el-tab-pane>
  <el-tab-pane name="c"></el-tab-pane>
  <el-tab-pane name="d"></el-tab-pane>
</el-tabs>
</template>

<script lang="ts" setup>
let active = $shallowRef('c')
</script>