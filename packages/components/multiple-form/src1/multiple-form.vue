<template>
  <div v-bind="$attrs" :class="ns.b()" :style="{ height }">
    <div :class="ns.e('title')" v-if="title">
      {{ title }}
    </div>

    <div :class="ns.e('tools')" v-if="$slots.tools">
      <slot name="tools" />
    </div>

    <el-table :columns="tableColumns" :data="rows"></el-table>
  </div>

  <!-- <el-form-dialog
    v-if="props.mode === 'dialog'"
    v-model="dialog.visible"
    :title="dialog.title"
    :confirm="submit"
    :continue="dialog.type === 'create'"
    :width="dialogWidth"
  >
    <el-form :data="form" :rules="rules" label-width="100px">
      <slot v-bind="{ form }" />
    </el-form>

    <slot name="dialog" v-bind="{ form }" />
  </el-form-dialog> -->
</template>

<script lang="ts" setup>
import {
  computed,
  watch,
  shallowRef,
  isReactive,
  shallowReactive
} from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import {
  multipleFormEmits,
  multipleFormProps,
MultipleFormRow
} from './multiple-form'
import { ElTable } from '@element-ultra/components/table'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import useColumns from './use-columns'
import useInline from './use-inline'

defineOptions({
  name: 'ElMultipleForm',
  inheritAttrs: false
})

const props = defineProps(multipleFormProps)
const emit = defineEmits(multipleFormEmits)

const rows = shallowRef<MultipleFormRow[]>([])


const emitChange = () => {
  const data = rows.value

  emit('change', rows.value)
  emit('update:data', rows.value)
}


const { errorTips } = useInline({
  props,
  emit,
  emitChange,
  internalData,
})

const handleCreateRow = () => {
  const { mode } = props
}

const { tableColumns } = useColumns({ props, errorTips, handleCreateRow })


watch(
  () => props.data,
  data => {
    if (data === internalData.value) return
    internalData.value = (data || []).map(item =>
      isReactive(item) ? item : shallowReactive(item)
    )
  },
  { immediate: true }
)

const ns = useNamespace('multiple-form')

let targetIndex = shallowRef(-1)

/** 弹框模式下应用显示列 */
const visibleColumns = computed(() => {
  const { columns } = props
  return columns?.filter(column => column.visible !== false)
})



watch(
  () => props.mode,
  () => (targetIndex.value = -1)
)
</script>
