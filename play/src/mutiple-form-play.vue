<template>
  <el-multiple-form
    :editable="true"
    :data="data"
    @change=""
    :columns="columns"
  >
    <template #default="{ row }">
      <el-select :options="[]" v-model="row.name" placeholder="名称" />
      <el-input v-model="row.age" placeholder="年龄"></el-input>
      <el-input v-model="row.school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
const columns = [
  {
    name: '姓名',
    key: 'name',
  },
  {
    name: '年龄',
    key: 'age',
  },
  {
    name: '学校',
    key: 'school',
  },
]

let data = $ref<any[]>([])

setTimeout(() => {
  data = [{ name: '张三', age: 20, school: '北大' }]
}, 3000)
</script>

<style lang="scss" scoped></style>
