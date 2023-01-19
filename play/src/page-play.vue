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

    <el-multiple-form :columns="columns" v-model:data="data1">
      <template #test="{ row }">
        <el-input v-model="row.test" />
      </template>
    </el-multiple-form>
    <el-multiple-form :columns="columns" v-model:data="data2">
      <template #test="{ row }">
        <el-input v-model="row.test" />
      </template>
    </el-multiple-form>

    <el-progress :width="50" :percentage="50" class="progress" type="circle" />

    <template #footer>
      <el-button @click="handleHide">随机隐藏某个表单</el-button>
      <el-button @click="handleValidate">校验表单</el-button>
    </template>
  </el-page>
</template>

<script setup lang="ts">
import { useFormModel } from 'element-ultra'

const fieldLength = 10

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

const columns = [
  { name: '测试', rules: { required: true }, key: 'test' }
]
const data1 = $shallowRef<any[]>([])
const data2 = $shallowRef<any[]>([])
</script>

<style>
.progress .el-progress-circle {
  width: 60px;
  height: 60px;
}
</style>
