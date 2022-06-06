<template>
  <div @click="handleClick" :class="ns.e('btn')">
    <slot>
      <el-button @click="handleClick" type="primary" :icon="Plus">
        选择
      </el-button>
    </slot>
  </div>

  <TableSelectDisplay v-if="table" :data="displayData">
    <template #action>
      <slot name="action"></slot>
    </template>
  </TableSelectDisplay>

  <TableSelectDialog :data="data" @change="handleChange" ref="dialogRef" />
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { tableSelectEmits, tableSelectProps } from './table-select'
import TableSelectDialog from './table-select-dialog.vue'
import TableSelectDisplay from './table-select-display.vue'
import { Plus } from '@element-plus/icons-vue'
import { tableSelectKey } from './token'
import { ElButton } from '@element-ultra/components/button'
import { useNamespace } from '@element-ultra/hooks'

defineOptions({
  name: 'ElTableSelect',
  inheritAttrs: false
})

const props = defineProps(tableSelectProps)

const emit = defineEmits(tableSelectEmits)

const ns = useNamespace('table-select')

provide(tableSelectKey, {
  rootProps: props
})

const dialogRef = shallowRef<InstanceType<typeof TableSelectDialog>>()

const handleClick = () => {
  dialogRef?.value?.open()
}

let displayData = shallowRef<any[]>([])

let handleChange = (data: any) => {
  let v =  Array.isArray(data) ? data : [data]
  displayData.value = v
  emit('update:modelValue', v)
  emit('change', v)
}
</script>
