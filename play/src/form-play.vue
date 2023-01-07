<template>
  <el-page>
    <div style="padding: 8px">
      {{ data }}
    </div>



    <el-card>
      <template #header>
        <span> 表单数据 </span>
        <el-checkbox v-model="disabled">是否禁用</el-checkbox>
      </template>

      <el-form :disabled="disabled" ref="formRef" :data="data" label-width="80px" :rules="rules">
        <el-radio-group label="审批流程" field="type">
          <el-radio value="1">文本1</el-radio>
          <el-radio value="2">文本2</el-radio>
        </el-radio-group>

        <el-checkbox label="是否选中" field="checked" />

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

        <el-input-number
          money
          label="数字"
          :precision="2"
          clearable
          field="num"
        />

        <el-tree-select
          :data="options"
          label="多选"
          field="multi"
          multiple
          value-key="name"
          label-key="name"
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
          text-field="bb"
        />

        <el-date-picker
          type="daterange"
          label="范围日期"
          v-model:start="data.start"
          v-model:end="data.end"
          field="rangedate"
        />

        <el-grid-input field="code" label="编码"></el-grid-input>

        <el-date-picker label="日期" type="week" field="date" />

        <el-input label="测试1" field="test.test1" />
        <el-input label="测试2" field="test.test2" />

        <el-textarea field="xing" label="姓氏"  show-word-limit maxlength="12" />
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
import { Search } from '@element-plus/icons-vue'

document.title = '表单测试'

let checked = $shallowRef(false)

let options = $shallowRef<any[]>([])

setTimeout(() => {
  options = [
    { modelKey: '1', name: '文本1' },
    { modelKey: '2', name: '文本2' },
    { modelKey: '3', name: '文本3' },
    { modelKey: '4', name: '文本4' }
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
    type: { value: '2' },
    code: { value: '' },
    checked: { value: true },
    address: { value: 'aas', required: true },
    date: {},
    rangedate: {},
    start: { value: '' },
    end: { value: '' },
    aa: { value: '00' },
    bb: { value: '默认值测试' },
    num: { value: null },
    cascade: { value: [] },
    xing: { value: '1' },
    ming: { value: '2' },
    multi: { value: ['文本1', '文本2', '文本3', '文本4'] },
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
    }
  },
  {
    name: model => model.xing + model.ming
  }
)

const formRef = shallowRef<any>()

const disabled = shallowRef(false)
</script>
