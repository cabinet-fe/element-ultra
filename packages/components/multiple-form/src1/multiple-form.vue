<template>
  <div v-bind="$attrs" :class="ns.b()" :style="{ height }">
    <div :class="ns.e('title')" v-if="title">
      {{ title }}
    </div>

    <div :class="ns.e('tools')" v-if="$slots.tools">
      <slot name="tools" />
    </div>

    <el-table
      :columns="tableColumns"
      :data="root.children"
      style="height: 400px"
    ></el-table>
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
import { multipleFormEmits, multipleFormProps } from './multiple-form'
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

const { root, emitChange, handleCreateRow, delRow, find, insertTo } = useRows({
  props,
  emit
})

// const {} = useDialogEdit({ })

// 行内编辑
const { errorTips } = useInlineEdit({
  props,
  emit,
  emitChange,
  root
})

/** 列 */
const { tableColumns } = useColumns({
  props,
  errorTips,
  handleCreateRow,
  delRow,
  slots,
  ns
})

defineExpose({
  find,
  delete: delRow,
  insertTo
})
</script>
