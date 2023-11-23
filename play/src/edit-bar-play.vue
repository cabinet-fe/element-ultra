<template>
  <el-edit-bar
    sortable
    @create="onCreate"
    @delete="onDelete"
    v-model="select"
    tree
    :data="data"
    label-key="data.label"
    style="width: 300px;"
  >
  </el-edit-bar>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

let data = $ref([
  {
    data: { label: 0 },
    value: Date.now(),
    children: [{ data: { label: '子节点' }, value: Date.now() + 1 }]
  }
])

const select = shallowRef<any>(null)

const onCreate = () => {
  data = [
    ...data,
    {
      data: { label: data.length },
      value: Date.now(),
      children: Array.from({ length: 2 }).map((_, i) => ({
        data: { label: '子节点' },
        value: Date.now() + i
      })),
    }
  ]
}

const onDelete = (v: any) => {
  data = data.filter(item => item.value !== v)
}
</script>
