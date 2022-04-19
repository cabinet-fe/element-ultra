<template>
  <div :class="ns.b()">
    <!-- 按钮 -->
    <div @click="handleClick" :class="ns.e('btn')"><slot>
      <el-button type="primary" :icon="Plus">选择</el-button>
    </slot></div>
    <!-- 表格 -->
    <TableCl :data="selected" :columns="columns" />
    <!-- 弹框 -->
    <DialogCl
      ref="dialogRef"
      :api="api"
      :data="data"
      :columns="columns"
      :value="selected"
      @change="handleSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, provide, onMounted } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectProps } from './table-select'
import TableCl from './table-cl.vue'
import DialogCl from './dialog-cl.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from '@element-ultra/components'

defineOptions({
  name: 'ElTableSelect'
})

const props = defineProps(tableSelectProps)

const { modelValue, columns, data, multiple, api, pagination, showIndex, stripe } = props

provide('multiple', multiple)
provide('pagination', pagination)
provide('showIndex', showIndex)
provide('stripe', stripe)

const ns = useNamespace('table-select')

let selected = $ref<any>([])

const dialogRef = shallowRef()

const handleClick = () => {
  dialogRef.value.open()
}

const handleSelect = (data: Record<string, any>) => {
  multiple ? (selected = data) : (selected = [data])
  emits('update:modelValue', data)
}

const emits = defineEmits<{
  (e: 'update:modelValue', data: Record<string, any>): void
}>()

const stateInit = () => {
  multiple ? (selected = modelValue) : (selected = [modelValue])
}

onMounted(() => {
  stateInit()
})

defineExpose({})
</script>
