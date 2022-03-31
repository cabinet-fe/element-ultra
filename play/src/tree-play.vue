<template>
  <el-tree
    :data="data"
    show-checkbox
    @check="c.log"
    :height="208"
    :default-expanded-keys="['0']"
  >
  </el-tree>
</template>

<script setup lang="ts">
const data = Array.from({ length: 10 }).map((_, index) => {
  return {
    label: `文本${index}`,
    value: `${index}`,
    children: Array.from({ length: Math.round(Math.random() * 10) }).map(
      (_, childIndex) => {
        return {
          label: `子文本${childIndex}`,
          value: `${index}-${childIndex}`
        }
      }
    )
  }
})
</script>

<style lang="scss"></style>
