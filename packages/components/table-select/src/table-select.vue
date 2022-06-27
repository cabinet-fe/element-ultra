<template>
  <div @click="open" v-if="!disabled" :class="ns.e('btn')">
    <slot>
      <el-button type="primary" :icon="Plus"> 选择 </el-button>
    </slot>
  </div>

  <TableSelectDisplay v-if="table" :data="displayData">
    <template #action>
      <slot name="action"></slot>
    </template>
  </TableSelectDisplay>

  <TableSelectDialog
    :data="data"
    @change="handleChange"
    :query="query"
    ref="dialogRef"
  >
    <template #searcher><slot name="searcher" /></template>
  </TableSelectDialog>
</template>

<script lang="ts" setup>
import { provide, shallowRef, useSlots, watch } from 'vue'
import { tableSelectEmits, tableSelectProps } from './table-select'
import TableSelectDialog from './table-select-dialog.vue'
import TableSelectDisplay from './table-select-display.vue'
import { Plus } from '@element-plus/icons-vue'
import { tableSelectKey } from './token'
import { ElButton } from '@element-ultra/components/button'
import { useNamespace, useSize } from '@element-ultra/hooks'

defineOptions({
  name: 'ElTableSelect',
  inheritAttrs: false
})

const props = defineProps(tableSelectProps)

const size = useSize({ props })

const emit = defineEmits(tableSelectEmits)

const ns = useNamespace('table-select')
const slots = useSlots()

provide(tableSelectKey, {
  rootProps: props,
  slots,
  size
})

const dialogRef = shallowRef<InstanceType<typeof TableSelectDialog>>()

const open = () => {
  dialogRef?.value?.open()
}

let displayData = shallowRef<any[]>([])

let handleChange = (data: any) => {
  if (!props.dialogColumns) {
    displayData.value = Array.isArray(data) ? data : [data]
    emit('update:modelValue', data)
  }

  emit('change', data)
}

watch(
  () => props.modelValue,
  data => {
    displayData.value = Array.isArray(data) ? data : [data]
  },
  { immediate: true }
)

defineExpose({ open })
</script>
