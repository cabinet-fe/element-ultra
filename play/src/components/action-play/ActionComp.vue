<template>
  <el-action-group>
    <template v-for="i in 3">
      <el-action>aaa</el-action>
    </template>
    <slot />
    <template v-for="i in 3">
      <el-action>aaa</el-action>
    </template>
  </el-action-group>
</template>

<script lang="ts" setup></script>
