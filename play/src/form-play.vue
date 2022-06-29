<template>
  <el-page>
    <div style="padding: 8px">
      {{ data }}
    </div>

    <el-card title="表单数据">
      <el-form ref="formRef" :data="data" label-width="80px" :rules="rules">
        <el-radio-group label="审批流程" field="type">
          <el-radio value="1">文本1</el-radio>
          <el-radio value="2">文本2</el-radio>
        </el-radio-group>

        <el-input-number money label="数字" clearable field="num" />

        <el-cascade
          label="级联"
          :props="{ label: 'name', checkStrictly: true }"
          clearable
          field="cascade"
          :options="[
            {
              name: '哈哈',
              value: 'aa',
              children: [{ name: '呵呵', value: 'bb' }]
            }
          ]"
        >
        </el-cascade>

        <template v-if="data.type === '1'">
          <el-input label="手机号" field="phone" />
        </template>

        <template v-else>
          <el-input :suffix-icon="Search" label="姓名" clearable field="name" />
          <el-input label="住址" clearable field="address" />
        </template>

        <el-select label="选择框" :options="[{ label: 'aa', value: '1' }]" multiple field="aa" />

        <el-date-picker
          type="daterange"
          label="范围日期"
          v-model:start="data.start"
          v-model:end="data.end"
          field="rangedate"
        />

         <el-date-picker
          label="日期"
          field="date"
          v-model="data.start"
        />
      </el-form>
      <el-button @click="formRef.validate()">校验</el-button>
    </el-card>

    <el-checkbox :checked="checked">aa</el-checkbox>
    <el-button @click="checked = !checked">切换</el-button>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'
import { shallowRef } from 'vue'
import { Search } from '@element-plus/icons-vue'

document.title = '表单测试'

let checked = $shallowRef(false)

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
  name: { match: [/^[^\d]+$/, '不能有数字'], value: '' },
  phone: { value: '', match: [/^1\d{10}$/, '手机号不正确'] },
  type: { value: '2' },
  address: { required: true },
  date: {},
  rangedate: {},
  start: { value: '' },
  end: { value: '' },
  aa: { value: [] },
  num: { value: null },
  cascade: { value: [] }
})

const formRef = shallowRef<any>()
</script>
