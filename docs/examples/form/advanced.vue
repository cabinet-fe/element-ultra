<template>
  <!-- 基础表单 -->
  <el-form
    v-slot="{ group }"
    :data-provider="{ options: [] }"
    @change="(field, value, all) => field"
  >
    <el-input
      v-if="group"
      label="你好"
      tip="这是一个提示"
      field="这是一个字段"
    />

    <el-select options="options" />
  </el-form>

  <!-- 表单列表 -->
  <el-form-list :model="{}">
    <el-input />
    <el-input />
  </el-form-list>

  <!-- 步骤表单 -->
  <!-- 后续步骤的表单能够拿到之前表单的值 -->
  <el-form-step>
    <el-form> </el-form>

    <el-form> </el-form>

    <el-form> </el-form>
  </el-form-step>
</template>

<script lang="ts" setup>
const forms = [
  {
    field: 'xxx',
    component: 'xxx',
    onChange(value) {},
    rule: {
      validator: new Function(
        'value',
        'form',
        'rule',
        `
      if (value < form['${field}']) {
        return '报错报错'
      }
    `
      ),
    },
  },
]
</script>
