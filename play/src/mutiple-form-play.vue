<template>
  <el-multiple-form
    :editable="true"
    :data="data"
    :columns="columns"
    @save="onSave"
    @delete="onDelete"
    @add-next-line="addNextLine"
    :create-btn-text="false"
  >
    <template #default="{ row }">
      <el-input v-model="row.name" placeholder="名称" />
      <el-input-number :min="1" v-model="row.age" placeholder="单价" />
      <el-input v-model="row.school"></el-input>
    </template>
  </el-multiple-form>
</template>

<script lang="ts" setup>
import type { MultipleFormColumn } from 'element-ultra'

const columns: MultipleFormColumn[] = [
  {
    name: '银行卡号',
    key: 'name',
    rules: {
      required: true,
      validator(v) {
        console.log(...arguments)
        if (!v) return '必填'
        if (v.length < 6) {
          return ''
        }
        return '不能超过6'
      }
    },
    width: 200,
    align: 'center'
  },
  {
    name: '年龄',
    key: 'age',
    rules: {
      required: [true, '必填'],
      min: 2
    },
    align: 'left',
    width: 200
  },
  {
    name: '手机号',
    key: 'school',
    rules: {
      required: true,
      match: [
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        '输入正确手机号'
      ]
    },
    width: 150
  }
]

let data = $ref<any[]>([
  { name: '6216616101002312625', age: 20, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' },
  { name: '6216616101002312625', age: 18, school: '15962245908' }
])

/** 保存 */
const onSave = (row: any) => {
  console.log('保存成功, 数据是：', row)
}

/** 删除 */
const onDelete = (row: any) => {
  console.log(row, 'row_删除')
  console.log('删除')
}

/** 增加下一行 */
const addNextLine = (row:any)=>{
  console.log(row,'row_增加')
}
</script>

