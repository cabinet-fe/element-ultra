<template>
  <div>
    单选
    <el-tree-select v-model="data.value1" :data="treeData" :selectable="selectable" />
  </div>
  <div>
    多选
    <el-tree-select v-model="data.value2" :data="treeData" multiple />
  </div>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'

const data = shallowReactive({
  value1: '',
  value2: []
})

const treeData = Array.from({ length: 10 }).map((_, index) => {
  return {
    label: `文本${index}`,
    value: `${index}`,
    children: Array.from({ length: Math.round(Math.random() * 2) }).map((_, childIndex) => {
      return {
        label: `文本${index}-${childIndex}`,
        value: `${index}-${childIndex}`
      }
    })
  }
})

const selectable = (row: Record<string, any>) => {
  return row.isLeaf ? true : false
}
</script>
