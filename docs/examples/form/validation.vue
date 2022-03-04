<template>
  <el-radio-group v-model="labelPosition">
    <el-radio-button label="left">Left</el-radio-button>
    <el-radio-button label="right">Right</el-radio-button>
    <el-radio-button label="top">Top</el-radio-button>
  </el-radio-group>

  <br /><br>
  <hr />
  <br />

  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    :label-position="labelPosition"
  >

    <el-input clearable label="活动名称" field="name"></el-input>

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

    <el-input label="Activity form" field="desc" type="textarea"></el-input>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ElForm } from 'element-pro'

type FormInstance = InstanceType<typeof ElForm>

const formSize = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = {
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
  delivery: false,
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
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate()
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const labelPosition = ref('left')
</script>
