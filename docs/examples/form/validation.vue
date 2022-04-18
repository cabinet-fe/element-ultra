<template>
  <el-radio-group v-model="labelPosition">
    <el-radio-button value="left">左</el-radio-button>
    <el-radio-button value="right">右</el-radio-button>
    <el-radio-button value="top">上</el-radio-button>
  </el-radio-group>

  <el-radio-group v-model="formSize">
    <el-radio-button value="large">大</el-radio-button>
    <el-radio-button value="default">中</el-radio-button>
    <el-radio-button value="small">小</el-radio-button>
  </el-radio-group>

  <el-radio-group v-model="disabled">
    <el-radio-button :value="true">禁止编辑</el-radio-button>
    <el-radio-button :value="false">可编辑</el-radio-button>
  </el-radio-group>

  <el-radio-group v-model="cols">
    <el-radio-button :value="1">单列</el-radio-button>
    <el-radio-button :value="2">两列</el-radio-button>
    <el-radio-button :value="3">三列</el-radio-button>
    <el-radio-button :value="4">自适应</el-radio-button>
  </el-radio-group>

  <br /><br />
  <hr />
  <br />

  <el-form
    ref="ruleFormRef"
    :data="data"
    :rules="rules"
    :cols="cols !== 4 ? cols : undefined"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    :disabled="disabled"
    :label-position="labelPosition"
  >
    <el-input tips="给你的活动起一个帅气的名字" clearable label="活动名称" field="name" />

    <el-select
      label="活动地点"
      field="region"
      :options="[
        { label: 'Zone one', value: '上海' },
        { label: 'Zone two', value: '北京' }
      ]"
    />

    <el-date-picker label="活动时间" type="datetime" field="date" />

    <el-checkbox-group label="活动类型" field="type">
      <el-checkbox value="线上" name="type"></el-checkbox>
      <el-checkbox value="线下" name="type"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group label="资源" field="resource">
      <el-radio value="赞助"></el-radio>
      <el-radio value="场地"></el-radio>
    </el-radio-group>

    <el-input v-if="data.resource === '赞助'" label="赞助商" field="sponsor" />
    <el-input v-else label="场地地址" field="address" />

    <el-textarea span="max" label="描述" field="desc" />

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>

  <div>
    <strong>编辑赞助商或者场地地址， 然后切换资源， 查看值的变化</strong> <br/>
    <strong>是的，现在被销毁的组件， 其绑定的字段值也会随之被重置!</strong>
    <div>{{ data }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormInstance, useFormModel } from 'element-ultra'
import { ComponentSize } from '@element-ultra/constants'

const formSize = ref<ComponentSize>('default')
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()
const cols = ref(1)

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
  address: {}
})

const submitForm = () => {
  ruleFormRef.value?.validate()
}

const resetForm = () => {
  ruleFormRef.value?.resetFields()
}

const labelPosition = ref('left' as const)
</script>
