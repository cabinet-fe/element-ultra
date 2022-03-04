<template>
  <el-row class="mb-4">
    <el-button>默认</el-button>
    <el-button type="primary">主要</el-button>
    <el-button type="success">成功</el-button>
    <el-button type="info">信息</el-button>
    <el-button type="warning">警告</el-button>
    <el-button type="danger">危险</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button plain>朴素</el-button>
    <el-button type="primary" plain>主要</el-button>
    <el-button type="success" plain>成功</el-button>
    <el-button type="info" plain>信息</el-button>
    <el-button type="warning" plain>警告</el-button>
    <el-button type="danger" plain>危险</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button round>圆角</el-button>
    <el-button type="primary" round>主要</el-button>
    <el-button type="success" round>成功</el-button>
    <el-button type="info" round>信息</el-button>
    <el-button type="warning" round>警告</el-button>
    <el-button type="danger" round>危险</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle></el-button>
    <el-button type="primary" :icon="Edit" circle></el-button>
    <el-button type="success" :icon="Check" circle></el-button>
    <el-button type="info" :icon="Message" circle></el-button>
    <el-button type="warning" :icon="Star" circle></el-button>
    <el-button type="danger" :icon="Delete" circle></el-button>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from '@element-plus/icons-vue'
</script>

<!-- <style>
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-error: #f56c6c;
  --el-color-info: #909399;
}
</style> -->
