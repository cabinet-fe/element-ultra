<template>
  <el-action-group>
    <el-action @run="c.log('编辑')" need-confirm>编辑</el-action>
    <Comp />
  </el-action-group>
</template>

<script setup lang="tsx">
import { defineComponent } from 'vue'

const Comp = defineComponent({
  name: 'Comp',
  render() {
    // return () => (
      return <div>
        <el-action onRun={console.log('查看')}>查看</el-action>
        <el-action onRun={console.log('审核')}>审核</el-action>
        <el-action onRun={console.log('删除')} need-confirm>
          删除
        </el-action>
      </div>
    // )
  }
})
</script>
