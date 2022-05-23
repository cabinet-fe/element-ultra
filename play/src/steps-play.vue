<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step v-for="step of steps" v-bind="step"></el-step>
  </el-steps>
</template>

<script lang="ts" setup>
let active = $shallowRef('')

const steps = [
  { name:'a', title: 'aa' },
  { name:'b', title: 'bb' },
  { name:'c', title: 'cc' }
]

setTimeout(() => {
  active = 'a'
}, 500)

</script>
