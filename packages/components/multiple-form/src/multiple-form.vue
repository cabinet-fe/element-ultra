<template>
  <div v-bind="$attrs" :class="ns.b()" :style="{ height }">
    <div :class="ns.e('title')" v-if="title">
      {{ title }}
    </div>

    <div :class="ns.e('tools')" v-if="$slots.tools">
      <slot name="tools" />
    </div>

    <!-- FIXME :noresize="!!height" -->
    <el-scrollbar :style="{ height: bodyHeight }" always :bar-z-index="3" :class="ns.e('source')">
      <table cellpadding="0" border="0" cellspacing="0" :class="ns.e('table')">
        <colgroup>
          <col style="width: 60px" />
          <col
            v-for="column of columns"
            :key="column.key"
            :style="{ width: column.width + 'px' }"
          />
          <col :style="{ width: actionWidth + 'px' }" />
        </colgroup>

        <thead>
          <tr>
            <th style="text-align: center">序号</th>

            <th
              v-for="column of columns"
              :class="{ 'is-required': columnRules[column.key]?.required }"
              :style="{ textAlign: column.align }"
            >
              <el-tooltip
                v-if="errorTip[column.key]"
                placement="top"
                :visible="true"
                effect="dark"
                :content="errorTip[column.key]"
              >
                <span style="color: #f00">{{ column.name }}</span>
              </el-tooltip>

              <template v-else> {{ column.name }} </template>

              <el-tooltip v-if="column.tips" effect="dark" :content="column.tips">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </th>

            <th :class="ns.e('action')">
              <span>操作</span>

              <el-button
                v-if="mode !== 'custom'"
                style="margin-left: 8px"
                :icon="Plus"
                @click="handleCreate(rows.length)"
                text
              >
                新增
              </el-button>
            </th>
          </tr>
        </thead>

        <tbody>
          <MultipleFormRow
            v-for="(row, i) of rows"
            ref="rowRefs"
            :row="row"
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
          </MultipleFormRow>

          <tr v-if="!rows.length">
            <td :colspan="columns.length + 2" style="text-align: center">暂无数据</td>
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
  >
    <el-form :data="formData" :rules="rules" label-width="100px">
      <slot v-bind="formData" />
    </el-form>
  </el-form-dialog>
</template>

<script lang="ts" setup>
import {
  computed,
  useSlots,
  watch,
  shallowRef,
  nextTick,
  shallowReactive,
  type ShallowReactive,
  provide
} from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { multipleFormEmits, multipleFormProps, type MultipleFormRules } from './multiple-form'
import ElButton from '@element-ultra/components/button'
import ElTooltip from '@element-ultra/components/tooltip'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import { ElIcon } from '@element-ultra/components/icon'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import useDialog from './use-dialog'
import useInline from './use-inline'
import { multipleFormKey } from './token'
import MultipleFormRow from './multiple-form-row.vue'

defineOptions({
  name: 'ElMultipleForm'
})

const props = defineProps(multipleFormProps)
const emit = defineEmits(multipleFormEmits)

const ns = useNamespace('multiple-form')

let targetIndex = shallowRef(-1)

const rows = shallowRef<ShallowReactive<Record<string, any>>[]>([])

const slots = useSlots()

const { formData, rules, dialog, open, submit } = useDialog({
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

provide(multipleFormKey, {
  multipleFormProps: props,
  ns,
  slots
})

const bodyHeight = computed(() => {
  const titleHeight = props.title ? 36 : 0
  const toolsHeight = slots.tools ? 40 : 0
  return props.height ? `calc(100% - ${titleHeight + toolsHeight}px)` : ''
})

const initRows = () => {
  rows.value = props.data.map(item => shallowReactive(item))
}

// 回显
watch(() => props.data, initRows, { immediate: true })

watch(
  () => props.mode,
  () => (targetIndex.value = -1)
)

/** 创建 */
const handleCreate = (index: number) => {
  const { mode } = props

  if (mode === 'inline') {
    if (targetIndex.value !== -1) {
      showGuide.value = true
      return
    }
    targetIndex.value = index
    splitRowByIndex(index, createInlineRow())
    createInlineRow()
    nextTick(() => {
      rowRefs.value[index]?.el.scrollIntoView()
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

defineExpose({
  clearValidate
})
</script>
