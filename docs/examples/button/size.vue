<template>
  <el-row>
    <el-button size="large" :icon="Search">Search</el-button>
    <el-button :icon="Search">Search</el-button>
    <el-button size="small" :icon="Search">Search</el-button>
  </el-row>
  <el-row class="my-4">
    <el-button size="large" round>Large</el-button>
    <el-button round>Default</el-button>
    <el-button size="small" round>Small</el-button>
  </el-row>
  <el-row>
    <el-button :icon="Search" size="large" circle></el-button>
    <el-button :icon="Search" circle></el-button>
    <el-button :icon="Search" size="small" circle></el-button>
  </el-row>
</template>

<script setup lang="ts">
import { Search } from 'icon-ultra'
</script>
