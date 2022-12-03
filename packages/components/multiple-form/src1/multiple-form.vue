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
    v-if="mode === 'dialog'"
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
import { useSlots } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import {
  multipleFormEmits,
  multipleFormProps,
} from './multiple-form'
import { ElTable } from '@element-ultra/components/table'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import useColumns from './use-columns'
import useInlineEdit from './use-inline-edit'
import useRows from './use-rows'
import useDialogEdit from './use-dialog-edit'

defineOptions({
  name: 'ElMultipleForm',
  inheritAttrs: false
})

const props = defineProps(multipleFormProps)

const emit = defineEmits(multipleFormEmits)

const slots = useSlots()

const ns = useNamespace('multiple-form')

const { rows, emitChange, handleCreateRow, handleDeleteRow } = useRows({
  props,
  emit
})

// const {} = useDialogEdit({ })

const { errorTips } = useInlineEdit({
  props,
  emit,
  emitChange,
  rows
})

const { tableColumns } = useColumns({
  props,
  errorTips,
  handleCreateRow,
  handleDeleteRow,
  slots,
  ns
})
</script>
