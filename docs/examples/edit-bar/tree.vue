<template>
  <ElEditBar
    @create="onCreate"
    tree
    @delete="onDelete"
    style="background-color: #fff"
    :data="data"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
let data = shallowRef([
  { label: '一级节点' + 0, value: Date.now(), children: [{ label: '子节点', value: Date.now() + 1 }] }
])

/** 点击节点的新增和底部的新增来查看控制台的输出 */
const onCreate = (parent) => {
  console.log(parent)
  data.value = [
    ...data.value,
    {
      label: '二级节点' + data.value.length,
      value: Date.now(),
      children: [{ label: '子节点', value: Date.now() + 1 }]
    }
  ]
}

const onDelete = (v: any) => {
  data.value = data.value.filter((item) => item.value !== v)
}
</script>
