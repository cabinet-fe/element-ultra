<template>
  <el-grid :cols="{ cols: 3, s: 1, m: 2, xl: 3 }" gap="0,4" tag="section" style="height: 100%">
    <div style="background-color: #fff">111</div>
    <div style="background-color: #fff">222</div>
    <div style="background-color: #fff">333</div>
  </el-grid>
</template>

<script setup lang="tsx">
import { defineComponent, useSlots } from 'vue'

const MyComponent = defineComponent({
  setup(props) {
    const slots = useSlots()
    return () => <div class='aaa'>{slots.default?.()}</div>
  }
})
</script>
