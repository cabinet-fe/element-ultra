<template>
  <div>
    <el-button>默认</el-button>
    <el-button type="primary" plain>主色</el-button>
    <el-button type="success">成功色</el-button>
    <el-button type="info" round>信息</el-button>
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" text>危险</el-button>
  </div>
</template>

<script lang="ts" setup>
import { Star } from 'icon-ultra'
</script>
