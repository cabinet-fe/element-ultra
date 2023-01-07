<template>
  <div :class="ns.b()" v-bind="$attrs" v-if="!noTrigger || !hide">
    <template v-if="!tableSelectDisabled">
      <!-- 触发器 -->
      <span
        v-if="!noTrigger"
        @click="!tableSelectDisabled && dialogRef?.open()"
        :class="ns.e('btn')"
      >
        <slot>
          <el-button :disabled="tableSelectDisabled" type="primary">
            选择
          </el-button>
        </slot>
      </span>

      <!-- 清空数据 -->
      <el-popconfirm
        v-if="clearable"
        @confirm="handleClear()"
        :hide-after="0"
        title="确定清空"
      >
        <template #reference>
          <el-button :disabled="tableSelectDisabled" type="warning">
            {{ clearText }}
          </el-button>
        </template>
      </el-popconfirm>
    </template>

    <!-- 数据展示表格 -->
    <ElTable
      v-if="!hide"
      :size="props.size"
      :columns="props.columns"
      :data="displayData"
      v-bind="$attrs"
    >
      <template
        v-for="column of props.columns.filter(column => !!column.slot)"
        :key="column.slot"
        v-slot:[column.slot!]="scoped"
      >
        <slot :name="column.slot" v-bind="scoped" />
      </template>
    </ElTable>
  </div>

  <!-- 数据选择和筛选表格 -->
  <TableSelectDialog ref="dialogRef">
    <template #searcher>
      <slot name="searcher" />
    </template>
  </TableSelectDialog>
</template>

<script setup lang="ts">
import { tableSelectEmits, tableSelectProps } from './table-select'
import { ElTable } from '@element-ultra/components/table'
import { ElPopconfirm } from '@element-ultra/components/popconfirm'
import { ElButton } from '@element-ultra/components/button'
import { provide, shallowRef } from 'vue'
import { tableSelectToken } from './token'
import { useDisabled, useNamespace } from '@element-ultra/hooks'
import TableSelectDialog from './table-select-dialog.vue'
import useApi from './use-api'

defineOptions({
  name: 'ElTableSelect',
  inheritAttrs: false
})

const props = defineProps(tableSelectProps)
const emit = defineEmits(tableSelectEmits)

const ns = useNamespace('table-select')

const tableSelectDisabled = useDisabled({ props })

const { displayData } = useApi({
  props,
  type: 'provide'
})

const dialogRef = shallowRef<InstanceType<typeof TableSelectDialog>>()

provide(tableSelectToken, {
  rootProps: props,
  ns,
  rootEmit: emit
})

const handleClear = () => {
  // 清空弹框中的所有数据
  dialogRef.value?.clear()

  const emptyData = props.multiple ? [] : null

  emit('update:modelValue', emptyData)
  emit('change', emptyData)
}

const open = () => dialogRef.value?.open()

const refresh = (reset = true) => dialogRef.value?.fetchData(reset)

defineExpose({
  open,
  refresh
})
</script>
