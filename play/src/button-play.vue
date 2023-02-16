<template>
  <div>
    <el-button @click="visible = true">默认</el-button>
    <el-button type="primary" plain>主色</el-button>
    <el-button type="success">成功色</el-button>
    <el-button type="info" round>信息</el-button>
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" text>危险</el-button>

    <el-drawer title="aaa" direction="rtl" size="400px" v-model="visible">
      <p>111</p>
      <p>111</p>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { Star } from 'icon-ultra'
import { shallowRef } from 'vue'

const visible = shallowRef(false)
</script>
