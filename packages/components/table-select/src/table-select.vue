<template>
  <div :class="ns.b()">
    <!-- 按钮 -->
    <div @click="handleClick" :class="ns.e('btn')">
      <slot>
        <el-button type="primary" :icon="Plus">选择</el-button>
      </slot>
    </div>
    <!-- 表格 -->
    <TableSelectDisplay :data="selected" :columns="columns">
      <template #action>
        <slot name="action"></slot>
      </template>
    </TableSelectDisplay>
    <!-- 弹框 -->
    <TableSelectDialog
      ref="dialogRef"
      :api="api"
      :data="data"
      :columns="columns"
      :value="selected"
      :query="query"
      :title="dialogTitle"
      @change="handleSelect"
      @api-data="apiData"
    >
      <template #searcher>
        <slot name="searcher"></slot>
      </template>
    </TableSelectDialog>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, provide, onMounted, ref } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectProps } from './table-select'
import TableSelectDisplay from './table-select-display.vue'
import TableSelectDialog from './table-select-dialog.vue'
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from '@element-ultra/components/button'
import { multipleKey, paginationKey, showIndexKey, stripeKey, valueKeyKey } from './token'

defineOptions({
  name: 'ElTableSelect'
})

const props = defineProps(tableSelectProps)

const {
  modelValue,
  columns,
  data,
  multiple,
  api,
  pagination,
  showIndex,
  stripe,
  query,
  valueKey,
  dialogTitle
} = props

provide(multipleKey, multiple)
provide(paginationKey, pagination)
provide(showIndexKey, showIndex)
provide(stripeKey, stripe)
provide(valueKeyKey, valueKey)

const ns = useNamespace('table-select')

let selected = ref<any>([])

const dialogRef = shallowRef()

const handleClick = () => {
  dialogRef.value.open()
}

const handleSelect = (data: Record<string, any>) => {
  multiple ? (selected.value = data) : (selected.value = [data])
  emits('update:modelValue', data)
}

const emits = defineEmits<{
  (e: 'update:modelValue', data: Record<string, any>): void
}>()

const stateInit = (tableData?: Record<string, any>) => {
  let arr: Array<string> = []
  multiple ? (arr = modelValue.map((item: any) => item[valueKey])) : (arr = [modelValue[valueKey]])
  if (api) {
    selected.value = tableData?.filter((row: Record<string, any>) => {
      return arr.includes(row[valueKey])
    })
  } else {
    selected.value = data?.filter((row: Record<string, any>) => {
      return arr.includes(row[valueKey])
    })
  }
}

const apiData = (data: Record<string, any>) => {
  stateInit(data)
}

onMounted(() => {
  stateInit()
})

defineExpose({})
</script>
