<template>
  <el-form :data="conf" :rules="confRules" :cols="3">
    <el-radio-group label="label对齐" field="labelPosition">
      <el-radio-button value="left">左</el-radio-button>
      <el-radio-button value="right">右</el-radio-button>
      <el-radio-button value="top">上</el-radio-button>
    </el-radio-group>

    <el-checkbox label="自适应label" field="response" />

    <el-slider v-if="!conf.response" label="label宽度" :max="300" :min="40" field="labelWidth" />

    <el-checkbox label="禁止编辑" field="disabled" />

    <el-radio-group label="表单尺寸" field="formSize">
      <el-radio-button value="large">大</el-radio-button>
      <el-radio-button value="default">中</el-radio-button>
      <el-radio-button value="small">小</el-radio-button>
    </el-radio-group>

    <el-radio-group label="布局" field="cols" :span="2">
      <el-radio-button :value="1">单列</el-radio-button>
      <el-radio-button :value="2">两列</el-radio-button>
      <el-radio-button :value="3">三列</el-radio-button>
      <el-radio-button :value="4">自适应</el-radio-button>
    </el-radio-group>
  </el-form>

  <hr style="margin-bottom: 20px" />

  <el-form
    ref="ruleFormRef"
    :data="data"
    :rules="rules"
    :cols="conf.cols !== 4 ? conf.cols : undefined"
    :label-width="conf.response ? undefined : conf.labelWidth"
    class="demo-ruleForm"
    :size="conf.formSize"
    :disabled="conf.disabled"
    :label-position="conf.labelPosition"
  >
    <el-input
      tips="给你的活动起一个帅气的名字"
      clearable
      label="活动名称"
      field="name"
    />

    <el-select
      label="活动地点"
      field="region"
      :options="[
        { label: '上海', value: '上海' },
        { label: '北京', value: '北京' }
      ]"
    />

    <el-date-picker label="活动时间" type="datetime" field="date" />

    <el-checkbox-group label="活动类型" field="type">
      <el-checkbox value="线上">线上</el-checkbox>
      <el-checkbox value="线下">线下</el-checkbox>
    </el-checkbox-group>

    <el-radio-group label="资源" field="resource">
      <el-radio value="赞助">赞助</el-radio>
      <el-radio value="场地">场地</el-radio>
    </el-radio-group>

    <el-input v-if="data.resource === '赞助'" label="赞助商" field="sponsor" />
    <el-input v-else label="场地地址" tips="这有个自定义校验" field="address" />

    <el-textarea span="max" label="描述" field="desc" />

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>

  <div>
    <strong>编辑赞助商或者场地地址， 然后切换资源， 查看值的变化</strong> <br />
    <strong>是的，现在被销毁的组件， 其绑定的字段值也会随之被重置!</strong>
    <div>{{ data }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormInstance, useFormModel } from 'element-ultra'
import { ComponentSize } from '@element-ultra/constants'

const [conf, confRules] = useFormModel({
  formSize: { value: 'default' as ComponentSize },
  disabled: { value: false },
  cols: { value: 1 },
  labelWidth: { value: 120 },
  response: { value: false },
  labelPosition: { value: 'left' as const }
})

const ruleFormRef = ref<FormInstance>()

// 除此之外, 你也可以按照经典方式去使用form-item进行双向绑定, 可以但是没有必要
const [data, rules] = useFormModel({
  name: {
    value: '',
    required: true,
    min: 3,
    max: 5
  },
  region: {
    value: '',
    required: true
  },
  date: {
    value: '',
    required: true
  },
  delivery: { value: [] },
  type: {
    value: [],
    required: true
  },
  resource: {
    value: '赞助',
    required: true
  },
  desc: {
    required: true,
    value: ''
  },

  sponsor: {},
  address: {
    validator(v, model) {
      if (model.region === '上海') {
        return '上海疫情比较严重，请换个地方'
      }
      return ''
    }
  }
})

const submitForm = () => {
  ruleFormRef.value?.validate()
}

const resetForm = () => {
  ruleFormRef.value?.resetFields()
}
</script>
