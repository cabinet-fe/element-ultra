<template>
  <div style="width: 600px; margin: 100px auto">
    <section>
      {{ data }}
    </section>

    <el-radio-group v-model="size">
      <el-radio value="large">大</el-radio>
      <el-radio value="default">中</el-radio>
      <el-radio value="small">小</el-radio>
    </el-radio-group>

    <el-form
      ref="formRef"
      :data="data"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
      :cols="1"
      :size="size"
    >
      <el-tree-select
        key="111"
        :data="treeData"
        field="node1"
        label="单选"
        text-field="node1Label"
        children-key="childnodes"
        label-key="data.label"
        value-key="data.value"
        :selectable="selectable"
      />

      <el-tree-select
        :data="treeData"
        filterable
        field="node2"
        check-strictly
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
import { shallowRef } from 'vue'
let treeData = shallowRef<any[]>([])
setTimeout(() => {
  treeData.value = Array.from({ length: 20 }).map((_, index) => {
    return {
      data: {
        label: `文本${20 + index}`,
        value: `${index}`
      },
      childnodes: Array.from({ length: 10 }).map((_, childIndex) => {
        return {
          data: {
            label: `文本${200 + index}${('00' + (childIndex + 1)).slice(-3)}`,
            value: `${index}-${childIndex}`
          }
        }
      })
    }
  })
}, 0)

const size = shallowRef('default' as const)

const [data, rules] = useFormModel({
  node1: {
    required: true,
    value: 'hi'
  },
  node2: {
    value: ['0'],
    required: true
  },
  node1Label: {
    value: '测试'
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
