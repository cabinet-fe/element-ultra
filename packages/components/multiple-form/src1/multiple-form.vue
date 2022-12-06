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

  <div>123</div>
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
import { flatTree } from './utils'

defineOptions({
  name: 'ElMultipleForm',
  inheritAttrs: false
})

const props = defineProps(multipleFormProps)

const emit = defineEmits(multipleFormEmits)

const slots = useSlots()

const ns = useNamespace('multiple-form')

const { root, handleCreateRow, delRow, find, insertTo } = useRows({
  props,
  emit
})

const { dialog, submit, form, rules, open } = useDialogEdit({ props, insertTo, root, emit })

// 行内编辑
const { errorTips, validate } = useInlineEdit({
  props
})

/** 列 */
const { tableColumns } = useColumns({
  props,
  emit,
  validate,
  errorTips,
  handleCreateRow,
  open,
  delRow,
  slots,
  ns,
  root
})



defineExpose({
  /** 查找数据 */
  find,
  /** 删除数据 */
  delete: delRow,
  /** 插入数据 */
  insertTo,
  /** 校验数据 */
  validate: async function() {
    const data = flatTree(root.children!)
    const allValid = await Promise.all(data.map(async item => {
      const valid = await validate(item.data)
      if (valid) {
        item.status = 'view'
      }
      return valid
    })).then(rets => rets.every(ret => ret))

    return allValid
  }
})
</script>
