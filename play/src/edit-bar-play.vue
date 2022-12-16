<template>
  <el-edit-bar
    sortable
    @create="onCreate"
    @delete="onDelete"
    tree
    :data="data"
  >
    <!-- <template #default="item">
      <span>
        {{ item.label }}
      </span>
    </template> -->
  </el-edit-bar>
</template>

<script setup lang="ts">
let data = $ref([
  { label: 0, value: Date.now(), children: [{ label: '子节点', value: Date.now() + 1 }] }
])

const onCreate = () => {
  data = [
    ...data,
    {
      label: data.length,
      value: Date.now(),
      children: [{ label: '子节点', value: Date.now() + 1 }]
    }
  ]
}

const onDelete = (v: any) => {
  data = data.filter((item) => item.value !== v)
}
</script>
