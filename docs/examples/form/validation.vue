<template>
  <el-radio-group v-model="labelPosition">
    <el-radio-button label="left">左</el-radio-button>
    <el-radio-button label="right">右</el-radio-button>
    <el-radio-button label="top">上</el-radio-button>
  </el-radio-group>

  <el-radio-group v-model="formSize">
    <el-radio-button label="large">大</el-radio-button>
    <el-radio-button label="default">中</el-radio-button>
    <el-radio-button label="small">小</el-radio-button>
  </el-radio-group>

  <el-radio-group v-model="disabled">
    <el-radio-button :label="true">禁止编辑</el-radio-button>
    <el-radio-button :label="false">可编辑</el-radio-button>
  </el-radio-group>

  <br /><br>
  <hr />
  <br />

  <el-form
    ref="ruleFormRef"
    :data="data"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    :disabled="disabled"
    :label-position="labelPosition"
  >

    <el-input tips="给你的活动起一个帅气的名字" clearable label="活动名称" field="name"></el-input>

    <el-select
      label="活动地点"
      field="region"
      :options="[
        { label: 'Zone one', value: '上海' },
        { label: 'Zone two', value: '北京' },
      ]"
    >
    </el-select>

    <el-date-picker label="活动时间" type="datetime" field="date" />

    <el-checkbox-group label="活动类型" field="type">
      <el-checkbox label="线上" name="type"></el-checkbox>
      <el-checkbox label="线下" name="type"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group label="资源" field="resource">
      <el-radio label="赞助"></el-radio>
      <el-radio label="场地"></el-radio>
    </el-radio-group>

    <el-textarea label="Activity form" field="desc" />
    <el-form-item>
      <el-button type="primary" @click="submitForm"
        >提交</el-button
      >
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormInstance, useFormModel } from 'element-ultra'

const formSize = ref('default')
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()

// 除此之外, 你也可以按照经典方式去使用form-item进行双向绑定, 可以但是没有必要
const [data, rules] = useFormModel({
  name: {
    value: '',
    required: true,
    min: 3,
    max: 5,
  },
  region: {
    value: '',
    required: true,
  },
  date: {
    value: '',
    required: true,
  },
  delivery: { value: [] },
  type: {
    value: [],
    required: true,
  },
  resource: {
    value: '',
    required: true,
  },
  desc: {
    required: true,
    value: '',
  },
})

const submitForm = () => {
  ruleFormRef.value?.validate()
}

const resetForm = () => {
  ruleFormRef.value?.resetFields()
}

const labelPosition = ref('left')
</script>
