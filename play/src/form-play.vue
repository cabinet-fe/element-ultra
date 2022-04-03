<template>
  <div style="padding: 8px">
    {{ data }}
  </div>

  <el-collapse>
    <el-collapse-item title="aaa">
      <el-form ref="formRef" :cols="2" :data="data" :rules="rules">
        <el-radio-group field="type" label="类型">
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
        </el-radio-group>

        <template v-if="data.type === '1'">
          <el-input tips="这是一个姓名" label="姓名" field="name" />
        </template>

        <el-input label="aaa" field="aa" />

        <el-select :options="[]" label="测试" field="test" />
      </el-form>
    </el-collapse-item>
  </el-collapse>

  <el-button @click="formRef.validate()">校验</el-button>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'
import { shallowRef } from 'vue'
document.title = '表单测试'

const [data, rules] = useFormModel({
  name: {
    required: true,
    value: ''
  },
  test: { required: true },

  type: { value: '2' },
  aa: {}
})

const formRef = shallowRef<any>()
</script>
