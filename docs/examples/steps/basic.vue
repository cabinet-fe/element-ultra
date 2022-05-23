<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1"></el-step>
      <el-step title="Step 2"></el-step>
      <el-step title="Step 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </div>

  <div>
    <div>
      有时候, 在代码里面用1, 2, 3这样既定的顺序是很愚蠢的, 会让代码变得难以维护.
      比如你从后端获取了一个接口...
    </div>
    <el-steps :active="progress" finish-status="success">
      <el-step name="dev" title="开发" />
      <el-step name="test" title="测试" />
      <el-step name="deploy" title="部署" />
    </el-steps>

    <el-button style="margin-top: 12px" @click="getProgress">获取进度</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
const progress = ref('')

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const getProgress = () => {
  progress.value = ['dev', 'test', 'deploy'][Math.round(Math.random() * 2)]
}
</script>
