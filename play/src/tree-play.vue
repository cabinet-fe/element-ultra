<template>
  <el-tree :data="data" show-checkbox height="100%" :default-expanded-keys="['0']"> </el-tree>
</template>

<script setup lang="ts">
let data = $shallowRef<any[]>([])

setTimeout(() => {
  data = Array.from({ length: 10 }).map((_, index) => {
    return {
      label: `文本${index}`,
      value: `${index}`,
      children: Array.from({ length: Math.round(Math.random() * 10) }).map((_, childIndex) => {
        return {
          label: `子文本${childIndex}`,
          value: `${index}-${childIndex}`
        }
      })
    }
  })
}, 1000)
</script>

<style lang="scss"></style>
