<template>
  <el-page ref="pageRef">
    <template v-for="i in 5" :key="i">
      <el-card v-if="hideIndex !== i" :header="`标题${i}`">
        <el-form :data="data" :cols="1"  :key="i" :rules="rules">
          <el-input
            v-for="(_, f) in fieldLength"
            :field="'field' + f"
            :label="'控件' + f"
          ></el-input>
        </el-form>
      </el-card>
    </template>

    <template #footer="{ extraRefs }">
      <el-button @click="c.log(extraRefs)">获取实例</el-button>
      <el-button @click="handleHide">随机隐藏某个表单</el-button>
      <el-button @click="handleValidate">校验表单</el-button>
    </template>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'

const fieldLength = 20

const [data, rules] = useFormModel(
  Array.from({ length: fieldLength }).reduce(
    (acc: Record<string, any>, _, i) => {
      acc['field' + i] = {
        required: true
      }
      return acc
    },
    {}
  )
)
const pageRef = $shallowRef<any>()

const handleValidate = async () => {
  await pageRef?.validate()
}

let hideIndex = $shallowRef(0)

const handleHide = () => {
  hideIndex = Math.ceil(Math.random() * 5)
}
</script>
