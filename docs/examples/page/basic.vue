<template>
  <el-page style="height: 400px">
    <!-- 额外的tab页 -->
    <template #panes>
      <el-tab-pane name="测试" label="test"> 111 </el-tab-pane>
    </template>

    <template #footer="{ extraRefs }">
      <el-button @click="c.log(extraRefs)">获取实例</el-button>
    </template>

    <el-card v-for="i in 5" :header="`标题${i}`">
      <el-form :data="data" :cols="1">
        <el-input v-for="(_, f) in fieldLength" :field="'field' + f" :label="'控件'+f"></el-input>

      </el-form>
    </el-card>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'

const fieldLength = 20

const [data] = useFormModel(
  Array.from({ length: fieldLength }).reduce(
    (acc: Record<string, any>, _, i) => {
      acc['field' + i] = {}
      return acc
    },
    {}
  )
)
</script>
