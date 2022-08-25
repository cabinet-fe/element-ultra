<template>
  <el-steps :active="active" align-center>
    <el-step v-for="step of steps" v-bind="step"></el-step>
  </el-steps>
</template>

<script lang="ts" setup>
let active = $shallowRef('b')

const steps = [
  { name:'a', title: 'aa' },
  { name:'b', title: 'bb' },
  { name:'c', title: 'cc' }
]
</script>

<style>
.flex {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  box-sizing: border-box;
  /* padding: 20px; */
  border: 1px solid #ccc;
}

.flex div {
  height: 20px;
  background-color: #ccc;
}
</style>