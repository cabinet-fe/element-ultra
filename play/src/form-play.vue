<template>
  <el-page>
    <div style="padding: 8px">
      <el-checkbox v-model="visible">显示</el-checkbox>
      <el-checkbox v-model="visible2">显示数字</el-checkbox>
    </div>

    <el-card v-if="visible">
      <template #header>
        <span> 表单数据 </span>
        {{ data }}
        <el-checkbox v-model="disabled">是否禁用</el-checkbox>
      </template>

      <el-form
        :disabled="disabled"
        ref="formRef"
        :data="data"
        :default-data="{ num: 2 }"
        label-width="80px"
        :rules="rules"
      >
        <el-radio-group
          label="审批流程"
          field="type"
          :items="[
            { label: '文本1', value: '1' },
            { label: '文本2', value: '2' }
          ]"
        >
          <!-- <el-radio value="1">文本1</el-radio>
          <el-radio value="2">文本2</el-radio> -->
        </el-radio-group>

        <el-checkbox-group
          label="结算方式"
          field="pay"
          :items="[
            { label: '现金', value: '1' },
            { label: '银行转账', value: '2' }
          ]"
        >
        </el-checkbox-group>

        <el-range label="范围组件" field="range">
          <el-input />
        </el-range>

        <el-checkbox label="是否选中" field="checked" />

        <el-cascade
          label="级联"
          :props="{ label: 'name', checkStrictly: true }"
          clearable
          field="cascade"
          :options="cascadeOptions"
        >
        </el-cascade>

        <el-cascade
          label="多选级联"
          :props="cascadeProps"
          clearable
          field="cascades"
          :options="cascadeOptions"
        />

        <el-input-number
          v-if="visible2"
          required
          money
          label="数字"
          tips="aaaa"
          :precision="2"
          clearable
          field="num"
          :multiple="10000"
          :max="1000000"
        />

        <el-tree-select
          :data="options"
          label="树形多选"
          field="multi"
          multiple
          value-key="name"
          label-key="name"
        />

        <el-select
          :options="options2"
          label="多选"
          field="multi"
          multiple
          span="max"
        />

        <template v-if="data.type === '1'">
          <el-input label="手机号" field="phone" />
        </template>

        <template v-else>
          <el-input label="住址" clearable field="address" />
        </template>

        <el-input label="姓" field="xing" />
        <el-input label="名" field="ming" />
        <el-input
          :disabled="false"
          :suffix-icon="Search"
          label="姓名"
          clearable
          field="name"
        />

        <el-select
          label="选择框"
          :options="[{ label: 'aa', value: '1' }]"
          field="aa"
          filterable
          text-field="bb"
        />

        <el-text-editor span="max" label="富文本" field="rich" />

        <el-form-item label="范围日期" field="start">
          <el-date-picker
            type="datetimerange"
            v-model:start="data.start"
            v-model:end="data.end"
          />
        </el-form-item>

        <el-grid-input field="code" label="编码"></el-grid-input>

        <el-date-picker label="日期" type="week" field="date" />

        <el-input label="测试1" field="test.test1" />
        <el-input label="测试2" field="test.test2" />

        <el-textarea field="xing" label="姓氏" show-word-limit maxlength="12" />
      </el-form>
    </el-card>

    <template #footer>
      <el-button @click="formRef.validate()">校验</el-button>
      <el-button @click="checked = !checked">切换</el-button>
    </template>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'
import { shallowRef } from 'vue'
import { Search } from 'icon-ultra'

document.title = '表单测试'

let checked = $shallowRef(false)

let options = $shallowRef<any[]>([])

const options2 = [
  '陈静',
  '刘畅',
  '王桧',
  '潘頔',
  '范佳成',
  '钱锋',
  '赵家钰',
  '朱宇翔'
].map(item => ({
  label: item,
  value: item
}))

setTimeout(() => {
  options = [
    { modelKey: '1', name: '文本1' },
    { modelKey: '2', name: '文本2' },
    { modelKey: '3', name: '文本3' },
    { modelKey: '4', name: '文本4' },
    { modelKey: '5', name: '文本5' },
    { modelKey: '6', name: '文本6' },
    { modelKey: '7', name: '文本7' },
    { modelKey: '8', name: '文本8' }
  ]
}, 500)

setTimeout(() => {
  // options2 = [
  //   { modelKey: '1', name: '文本1' },
  //   { modelKey: '2', name: '文本2' }
  // ]
}, 200)

const [data, rules] = useFormModel(
  {
    phone: { value: '', match: [/^1\d{10}$/, '手机号不正确'] },
    type: { required: true },
    pay: { value: [] },
    code: { value: '' },
    checked: { value: true },
    address: { value: 'aas', required: true },
    date: {},
    rangedate: {},
    range: {},
    start: { value: '', required: true },
    end: { value: '' },
    aa: { value: '00' },
    bb: { value: '默认值测试' },
    num: { value: null },
    cascade: { value: [] },
    cascades: { value: [] },
    xing: { value: '1' },
    ming: { value: '2' },
    multi: { value: [] },
    name: {
      match: [/^[^\d]+$/, '不能有数字'],
      value: ''
    },
    test: {
      value: {},
      children: {
        test1: {
          value: '1'
        },
        test2: {
          value: '2'
        }
      }
    },
    rich: {
      value: ''
    }
  },
  {
    name: model => model.xing + model.ming
  }
)

const cascadeProps = { label: 'name', multiple: true }

const cascadeOptions = Array.from({ length: 20 }).map((_, i) => {
  return {
    name: '哈哈' + i,
    value: 'aa' + i,
    children: [{ name: '呵呵' + i, value: 'bb' + i + '-1' }]
  }
})

const formRef = shallowRef<any>()

const disabled = shallowRef(false)
const visible = shallowRef(true)
const visible2 = shallowRef(false)
</script>
