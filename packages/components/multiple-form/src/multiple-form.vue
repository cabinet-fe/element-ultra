<template>
  <div v-bind="$attrs" :class="ns.b()" :style="{ height }">
    <div :class="ns.e('title')" v-if="title">
      {{ title }}
    </div>

    <div :class="ns.e('tools')" v-if="$slots.tools">
      <slot name="tools" />
    </div>

    <!-- FIXME :noresize="!!height" -->
    <el-scrollbar
      :style="{ height: bodyHeight }"
      always
      :bar-z-index="3"
      :class="ns.e('source')"
    >
      <table cellpadding="0" border="0" cellspacing="0" :class="ns.e('table')">
        <MultipleFormHeader />

        <tbody>
          <MultipleFormRow
            v-for="(row, i) of rows"
            ref="rowRefs"
            :row="row"
            :key="rowKey ? row[rowKey] : undefined"
            :row-index="i"
            :class="ns.is('guide', showGuide && i === targetIndex)"
            :show-inline="mode === 'inline' && i === targetIndex"
            @save="handleSaveRow(row, i)"
            @exit-edit="handleExitEdit(row, i)"
            @create="handleCreate(i + 1)"
            @delete="handleDeleteRow(row, i)"
            @edit="handleEdit(row, i)"
            @mouseenter="handleMouseEnter(i)"
          >
            <template #action:edit-mode="scoped">
              <slot name="action:edit-mode" v-bind="scoped" />
            </template>
            <template #action:view-mode="scoped">
              <slot name="action:view-mode" v-bind="scoped" />
            </template>
          </MultipleFormRow>

          <tr v-if="!rows.length">
            <!-- 额外的列为序号和操作栏 -->
            <td
              :colspan="visibleColumns!.length + (disabled ? 1 : 2)"
              style="text-align: center"
            >
              暂无数据
            </td>
          </tr>
        </tbody>
      </table>
    </el-scrollbar>
  </div>

  <!-- 弹框型表单 -->
  <el-form-dialog
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
  </el-form-dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  useSlots,
  watch,
  shallowRef,
  nextTick,
  provide,
  isReactive,
  reactive
} from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { multipleFormEmits, multipleFormProps } from './multiple-form'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import useDialogEdit from './use-dialog-edit'
import useInline from './use-inline'
import { multipleFormKey } from './token'
import MultipleFormRow from './multiple-form-row.vue'
import MultipleFormHeader from './multiple-form-header.vue'

defineOptions({
  name: 'ElMultipleForm'
})

const props = defineProps(multipleFormProps)
const emit = defineEmits(multipleFormEmits)

const rows = computed({
  get() {
    return (
      props.data?.map(item => (isReactive(item) ? item : reactive(item))) || []
    )
  },
  set(rows) {
    emit('change', rows)
    emit('update:data', rows)
  }
})

const ns = useNamespace('multiple-form')

let targetIndex = shallowRef(-1)

const slots = useSlots()

/** 弹框模式下应用显示列 */
const visibleColumns = computed(() => {
  const { columns } = props
  return columns?.filter(column => column.visible !== false)
})

const { form, rules, dialog, open, submit } = useDialogEdit({
  props,
  rows,
  emit
})

const {
  errorTip,
  showGuide,
  columnRules,
  rowRefs,
  createInlineRow,
  handleSaveRow,
  splitRowByIndex,
  handleDeleteRow,
  clearValidate,
  handleEnterEdit,
  handleExitEdit,
  handleMouseEnter
} = useInline({ props, emit, targetIndex, rows })

const bodyHeight = computed(() => {
  const titleHeight = props.title ? 36 : 0
  const toolsHeight = slots.tools ? 40 : 0
  return props.height ? `calc(100% - ${titleHeight + toolsHeight}px)` : ''
})

watch(
  () => props.mode,
  () => (targetIndex.value = -1)
)

/** 创建 */
const handleCreate = (index: number, data?: Record<string, any>) => {
  const { mode } = props

  if (mode === 'inline') {
    if (targetIndex.value !== -1) {
      showGuide.value = true
      return
    }
    targetIndex.value = index
    splitRowByIndex(index, createInlineRow(data))
    nextTick(() => {
      rowRefs.value[index]?.el?.scrollIntoView({
        block: 'nearest'
      })
    })
  } else if (mode === 'dialog') {
    open('create', { title: '新增', ctx: { index } })
  }
}

/** 编辑 */
const handleEdit = (row: any, index: number) => {
  const { mode } = props
  if (mode === 'inline') {
    handleEnterEdit(index)
  } else if (mode === 'dialog') {
    open('update', { title: '编辑', data: row, ctx: { index } })
  }
}

provide(multipleFormKey, {
  multipleFormProps: props,
  visibleColumns,
  columnRules,
  errorTip,
  ns,
  slots,
  rows,
  handleCreate
})

defineExpose({
  clearValidate,
  create: () => {
    handleCreate(rows.value.length)
  },
  createTo: (
    index: number,
    cb:
      | Record<string, any>
      | (() => Promise<Record<string, any>> | Record<string, any>)
  ) => {
    if (typeof cb === 'function') {
      let result = cb()
      if (result instanceof Promise) {
        result.then(data => handleCreate(index, data))
      } else {
        handleCreate(index, result)
      }
    } else {
      handleCreate(index, cb)
    }
  }
})
</script>
