<template>
  <div :class="ns.b()">
    <!-- 按钮 -->
    <div @click="handleClick" style="display: inline-block;"><slot /></div>
    <!-- 表格 -->
    <TableCl :data="selected" :columns="columns" />
    <!-- 弹框 -->
    <DialogCl ref="dialogRef" :data="data" :columns="columns" @change="handleSelect" />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, provide, watch, onMounted, nextTick } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectProps } from './table-select'
import TableCl from './table-cl.vue'
import DialogCl from './dialog-cl.vue'

defineOptions({
  name: 'ElTableSelect'
})

const props = defineProps(tableSelectProps)

const { modelValue, columns, data, multiple } = props

provide('multiple', multiple)

const ns = useNamespace('table-select')

let selected = $ref<any>([])

const dialogRef = shallowRef()

const handleClick = () => {
  dialogRef.value.open()
}

const handleSelect = (data: Record<string, any>) => {
  multiple ? selected = data : selected = [data]
}

const emits = defineEmits<{
  (e: 'update:modelValue', data: Record<string, any>[]): void
}>()

watch(() => selected, (cur, pre) => {
  emits('update:modelValue', cur)
})

const stateInit = () => {
  selected = modelValue
}

onMounted(() => {
  stateInit()
})

defineExpose({

})
</script>
