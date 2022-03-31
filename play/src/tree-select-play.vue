<template>
  <div style="width: 600px; margin: 100px auto">
    <section>
      <div>node1: {{ data.node1 }}</div>
      <div>node2: {{ data.node2 }}</div>
    </section>

    <el-form
      ref="formRef"
      :data="data"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
      :cols="1"
    >
      <el-tree-select :data="treeData" field="node1" label="单选" />

      <el-tree-select :data="treeData" field="node2" label="多选" multiple />

      <el-form-item label="操作">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useFormModel, type FormInstance } from 'element-ultra'

const treeData = Array.from({ length: 10 }).map((_, index) => {
  return {
    label: `文本${index}`,
    value: `${index}`,
    children: Array.from({ length: Math.round(Math.random() * 10) }).map(
      (_, childIndex) => {
        return {
          label: `文本${index}-${childIndex}`,
          value: `${index}-${childIndex}`
        }
      }
    )
  }
})

const [data, rules] = useFormModel({
  node1: {
    value: '',
    required: true
  },
  node2: {
    value: [],
    required: true
  }
})

const formRef = $ref<FormInstance>()

const submit = () => {
  formRef?.validate()
}

const reset = () => {
  formRef?.resetFields()
}
</script>
