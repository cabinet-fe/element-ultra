<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :data="data"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      cols="1"
    >
      <el-tree-select
        :data="treeData"
        field="node1"
        label="单选"
        clearable
        value-key="id"
      >
      </el-tree-select>

      <el-tree-select
        :data="treeData"
        field="node2"
        label="多选"
        clearable
        value-key="id"
        multiple
        tag-type="success"
      >
      </el-tree-select>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useFormModel, type FormInstance } from 'element-ultra'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, shallowRef, watch, watchEffect } from 'vue'
let inputTest = ref('node-1')
// let checkTest = shallowRef<string[]>([])

interface Tree {
  id: string
  label: string
  children?: Tree[]
  type?: String
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0
  return new Array(minNodesNumber).fill(deep).map(() => {
    const childrenNumber =
      deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
    const nodeKey = getKey(key, ++id)
    return {
      id: nodeKey,
      label: '文本' + nodeKey,
      children: childrenNumber
        ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
        : undefined,
    }
  })
}

const treeData = createData(2, 5, 15)
console.log(treeData)

const [data, rules] = useFormModel({
  node1: {
    value: 'node-2-1',
    required: true,
  },
  node2: {
    value: ['node-2-1', 'node-3-1','node-3-2'],
    required: true,
  }
})

const ruleFormRef = $ref<FormInstance>()

const submitForm = () => {
  ruleFormRef?.validate()
}

const resetForm = () => {
  ruleFormRef?.resetFields()
}
</script>

<style lang="scss" scoped></style>
