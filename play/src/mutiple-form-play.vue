<template>
  {{ data }}
  <el-button @click="add">增加</el-button>
  <el-multiple-form :data="data" @change="" :columns="columns">
    <template #default="{ row }">
      <el-input v-model="row.name" placeholder="名称"></el-input>
      <el-input v-model="row.age" placeholder="年龄"></el-input>
      <el-input v-model="row.school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
const data = $ref([])
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
const add = () => {
  let template = columns.reduce((acc, cur) => {
    acc[cur.key] = null
    return acc
  }, {})
  data.push({
    ...template,
  })
}
</script>

<style lang="scss" scoped></style>
