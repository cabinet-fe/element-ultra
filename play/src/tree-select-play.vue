<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :data="data"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-tree-select
        :data="treeData"
        field="node1"
        label="节点1"
        clearable
        value-key="id"
      >
      </el-tree-select>

      <el-tree-select
        :data="treeData"
        field="node2"
        label="节点2"
        size="large"
        clearable
        value-key="id"
        multiple
        tag-type="success"
      >
      </el-tree-select>

      <el-select
        field="value"
        label="select"
        filterable
        :options="[{value: 1, label: 'aaaasdasdasdasd'},{value: 2, label: 'bbbasdadasdasdasd'}]"
        placeholder="Please select"
        multiple
      />

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useFormModel } from 'element-ultra'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, shallowRef, watch, watchEffect } from 'vue'
let inputTest = ref('node-1')
// let checkTest = shallowRef<string[]>([])

interface Tree {
  id: string
  label: string
  children?: Tree[]
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
      label: nodeKey,
      children: childrenNumber
        ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
        : undefined,
    }
  })
}

const treeData = createData(2, 5, 5)

const [data, rules] = useFormModel({
  node1: {
    value: 'node-1',
    required: true,
    min: 3,
    max: 6,
  },
  node2: {
    value: [],
    required: true,
  },
  value: {
    value: []
  }
})

const ruleFormRef = ref()

const submitForm = () => {
  ruleFormRef.value?.validate()
}

const resetForm = () => {
  ruleFormRef.value?.resetFields()
}
</script>

<style lang="scss" scoped></style>
