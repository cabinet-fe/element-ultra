<template>
  <ActionComp>
    <el-action @run="c.log('编辑')" need-confirm>编辑</el-action>
  </ActionComp>
</template>

<script setup lang="ts">
import { ActionComp } from './components/action-play'
</script>
