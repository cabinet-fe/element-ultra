<template>
  <el-form :data="config" label-width="100px">
    <el-checkbox label="是否多选" field="multiple"></el-checkbox>
    <el-checkbox label="是否严格选择" field="checkStrictly"> </el-checkbox>
    <el-input-number label="树缩进长度" field="treeIndent" :min="6" />
  </el-form>

  <div>
    <el-tree-select
      v-model="value"
      :check-strictly="config.checkStrictly"
      :data="treeData"
      :multiple="config.multiple"
      :tree-indent="config.treeIndent"
    />
  </div>

  <div>
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { shallowReactive, shallowRef } from 'vue'

const value = shallowRef()

const config = shallowReactive({
  checkStrictly: false,
  multiple: false,
  treeIndent: 16
})

const treeData = Array.from({ length: 10 }).map((_, index) => {
  return {
    label: `文本${index}`,
    value: `${index}`,
    children: Array.from({ length: Math.round(Math.random() * 2) }).map(
      (_, childIndex) => {
        return {
          label: `文本${index}-${childIndex}`,
          value: `${index}-${childIndex}`
        }
      }
    )
  }
})

const selectable = (row: Record<string, any>) => {
  return row.isLeaf ? true : false
}
</script>
