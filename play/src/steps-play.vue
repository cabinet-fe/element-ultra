<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step name="a" title="aa"></el-step>
    <el-step name="b" title="bb"></el-step>
    <el-step name="c" title="cc"></el-step>
  </el-steps>
</template>

<script lang="ts" setup>
let active = $shallowRef('')

setTimeout(() => {
  active = 'a'
}, 500)

</script>
