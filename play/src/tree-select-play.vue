<template>
  <div style="width: 600px; margin: 100px auto">
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
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
      <el-tree-select
        key="111"
        :data="treeData"
        field="node1"
        label="单选"
        :selectable="selectable"
      />

      <el-tree-select
        :data="treeData"
        :selectable="selectable"
        field="node2"
        label="多选"
        multiple
      />

      <el-form-item label="操作">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useFormModel, type FormInstance } from 'element-ultra'
import { shallowRef, watch } from 'vue'
let treeData = shallowRef<any[]>([])
setTimeout(() => {
  treeData.value = Array.from({ length: 10 }).map((_, index) => {
    return {
      label: `文本${index}`,
      value: `${index}`,
      children: Array.from({ length: Math.round(Math.random() * 2) }).map((_, childIndex) => {
        return {
          label: `文本${index}-${childIndex}`,
          value: `${index}-${childIndex}`
        }
      })
    }
  })
}, 1000)

const [data, rules] = useFormModel({
  node1: {
    value: '0',
    required: true
  },
  node2: {
    value: ['0'],
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

const selectable = (row: Record<string, any>) => {
  return row.isLeaf ? true : false
}
</script>
