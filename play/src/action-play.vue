<template>
  <el-action-group>
    <el-action @run="c.log('编辑')" need-confirm>编辑</el-action>
    <el-action @run="c.log('查看')">查看</el-action>
    <el-action @run="c.log('审核')">审核</el-action>
    <el-action @run="c.log('删除')" need-confirm>删除</el-action>
  </el-action-group>
</template>

<script setup lang="ts"></script>
