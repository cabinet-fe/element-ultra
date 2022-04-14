<template>
  <el-page>
    <div style="padding: 8px">
      {{ data }}
    </div>
    <el-card title="表单数据">
      <el-form ref="formRef" :cols="{ cols: 2 }" :data="data" label-width="80px" :rules="rules">
        <el-select
          label="审批流程"
          :options="options"
          field="type"
          value-key="modelKey"
          label-key="name"
          filterable
        />
        <el-select
          label="审批流程2"
          :options="options2"
          field="type"
          value-key="modelKey"
          label-key="name"
          filterable
        />

        <template v-if="data.type === '1'">
          <el-input label="手机号" field="phone" />
        </template>

        <template v-else>
          <el-input label="姓名" field="name" />
          <el-input label="住址" field="address" />
        </template>
      </el-form>
      <el-button @click="formRef.validate()">校验</el-button>
    </el-card>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'
import { shallowRef } from 'vue'
document.title = '表单测试'

let options = $shallowRef<any[]>([])
let options2 = $shallowRef<any[]>([])

setTimeout(() => {
  options = [
    { modelKey: '1', name: '文本1' },
    { modelKey: '2', name: '文本2' }
  ]
}, 500)

setTimeout(() => {
  options2 = [
    { modelKey: '1', name: '文本1' },
    { modelKey: '2', name: '文本2' }
  ]
}, 200)

const [data, rules] = useFormModel({
  name: { required: true, value: '' },
  phone: {},
  type: { value: '2' },
  address: { required: true }
})

const formRef = shallowRef<any>()
</script>
