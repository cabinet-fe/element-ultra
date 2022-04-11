<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox value="Option A" />
    <el-checkbox value="Option B" />
    <el-checkbox value="Option C" />
    <el-checkbox value="disabled" disabled />
    <el-checkbox value="selected and disabled" disabled />
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkList = ref(['selected and disabled', 'Option A'])
</script>
