<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select :options="[
          { label: 'Zone one', value: '上海' },
          { label: 'Zone two', value: '北京' },
        ]" v-model="formInline.region" placeholder="Activity zone">

      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
