<template>
  <el-edit-bar sortable @create="onCreate" @delete="onDelete" style="background-color: #fff;" :data="data">
    <template #default="item">
      <span>
        {{ item.label }}
      </span>
    </template>
  </el-edit-bar>
</template>

<script setup lang="ts">
let data = $ref([
  { label: 0, value: Date.now() }
])

const onCreate = () => {
  data.push({ label: data.length, value: Date.now() })
}

const onDelete = (v: any) => {
  data = data.filter(item => item.value !== v)
}
</script>
