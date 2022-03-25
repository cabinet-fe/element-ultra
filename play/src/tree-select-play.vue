<template>
  <div>
    <!-- <el-tree-select :data="data" v-model="inputTest" effect="light" isize="small" clearable>

  </el-tree-select>
  {{inputTest}} -->
    <el-tree-select :data="data" v-model="checkTest" multiple effect="dark" clearable> </el-tree-select>
    <!-- {{ checkTest }} -->

    <h1 style="border: 1px solid blue;">123</h1>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowRef, watch, watchEffect } from 'vue'
let inputTest = ref('node-5-2')
let checkTest = shallowRef<string[]>([])

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0
  return new Array(minNodesNumber).fill(deep).map(() => {
    const childrenNumber =
      deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
    const nodeKey = getKey(key, ++id)
    return {
      id: nodeKey,
      label: nodeKey,
      children: childrenNumber
        ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
        : undefined,
    }
  })
}

const data = createData(2, 5, 5)
</script>

<style lang="scss" scoped></style>
