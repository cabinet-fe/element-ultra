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
            </th>

            <th :class="ns.e('action')">
              <span>操作</span>

              <el-button
                v-if="mode !== 'custom'"
                style="margin-left: 8px"
                :icon="Plus"
                @click="addTo(internalData.length)"
                text
              >
                新增
              </el-button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            :class="ns.is('guide', showGuide && i === editingIndex)"
            @mouseenter="i === editingIndex && (showGuide = false)"
            v-for="(item, i) of internalData"
            ref="rowRefs"
          >
            <td style="text-align: center">{{ i + 1 }}</td>

            <template v-if="editingIndex === i">
              <td
                v-for="(node, nodeIndex) of getChildren({ row: item })"
                :style="{ textAlign: columns[nodeIndex].align }"
              >
                <component :is="node" />
              </td>

              <td :class="ns.e('action')">
                <el-button type="primary" :icon="Select" text @click="saveRow(item, i)" />
                <el-button type="primary" :icon="Close" text @click="handleExitEdit(item, i)" />
              </td>
            </template>

            <template v-else>
              <td v-for="column of columns" :style="{ textAlign: column.align }">
                {{ column.render?.(item[column.key], item, i) || item[column.key] }}
              </td>

              <td :class="ns.e('action')">
                <el-button type="primary" :icon="Edit" text @click="handleEnterEdit(i)" />
                <el-button type="primary" :icon="Delete" text @click="deleteRow(item, i)" />
                <el-button
                  type="primary"
                  v-if="mode !== 'custom'"
                  :icon="Plus"
                  text
                  @click="addTo(i + 1)"
                />
              </td>
            </template>
          </tr>

          <tr v-if="!internalData.length">
            <td :colspan="columns.length + 2" style="text-align: center">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, useSlots, watch, shallowRef, nextTick } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { multipleFormProps, type MultipleFormRules } from './multiple-form'
import ElButton from '@element-ultra/components/button'
import ElTooltip from '@element-ultra/components/tooltip'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import { Edit, Close, Plus, Select, Delete } from '@element-plus/icons-vue'

defineOptions({
  name: 'ElMultipleForm'
})

const props = defineProps(multipleFormProps)

let editingIndex = shallowRef(-1)

const emit = defineEmits<{
  (e: 'save', row: any, rows: any[]): void
  (e: 'delete', row: any): void
  (e: 'change', rows: any[]): void
}>()

const ns = useNamespace('multiple-form')

const slots = useSlots()

/** 列校验是否必填*/
const columnRules = computed(() => {
  return props.columns.reduce((acc, column) => {
    if (column.rules) {
      acc[column.key] = column.rules
    }
    return acc
  }, {} as Record<string, Partial<MultipleFormRules>>)
})

/** 错误提示 */
const errorTip = reactive<Record<string, any>>({})

const bodyHeight = computed(() => {
  const titleHeight = props.title ? 36 : 0
  const toolsHeight = slots.tools ? 40 : 0
  return props.height ? `calc(100% - ${titleHeight + toolsHeight}px)` : ''
})

const showGuide = ref(false)

const internalData = ref<any[]>([])

const initInternalData = () => {
  internalData.value = [...props.data]
}

// 回显
watch(() => props.data, initInternalData, { immediate: true })

const getChildren = (scope: any) => {
  return slots.default?.(scope) || []
}

/** 创建一个空行 */
const createRow = () => {
  return props.columns.reduce(
    (acc, cur) => {
      acc[cur.key] = undefined
      return acc
    },
    { __new__: true } as Record<string, any>
  )
}

const rowRefs = shallowRef<HTMLTableRowElement[]>([])

const addTo = (index: number) => {
  if (editingIndex.value !== -1) {
    showGuide.value = true
    return
  }

  editingIndex.value = index

  internalData.value = [
    ...internalData.value.slice(0, index),
    createRow(),
    ...internalData.value.slice(index)
  ]

  nextTick(() => {
    rowRefs.value[index].scrollIntoView()
  })
}

/** 校验器 */
const validators = {
  required(value: any, required: boolean, msg = '该项必填') {
    if (!required) return

    if (Array.isArray(value)) {
      return value.length > 0 ? undefined : msg
    }
    if (!value && value !== 0) {
      return msg
    }
  },

  length(value: any, len: number, msg = '') {
    if (value.length !== len) {
      return msg || `长度应该等于${len}`
    }
  },

  min(value: any, min: number, msg = '') {
    if (Array.isArray(value)) {
      return value.length < min ? msg || `该项最小长度应为 ${min}` : undefined
    }

    if (typeof value !== 'number') {
      return msg || '请输入数字 '
    }

    if (typeof value === 'number' && value < min) {
      return msg || `最小值不得小于：${min}`
    }
  },

  max(value: any, max: number, msg = ''): any {
    if (Array.isArray(value)) {
      return value.length > max ? msg || `该项最大长度应为 ${max}` : undefined
    }

    if (typeof value !== 'number') {
      return msg || '请输入数字'
    }

    if (typeof value === 'number' && value > max) {
      return msg || `最大值不得大于：${max}`
    }
  },

  match(value: any, pattern: RegExp, msg = '') {
    if (typeof value !== 'string') {
      return msg || `请输入类型为：[string],而不是${typeof value}类型`
    }

    if (!pattern.test(value)) {
      return msg || `不匹配正则表达式：${pattern}`
    }
  }
}

/** 验证 */
function validate(item: any, rules: Record<string, Partial<MultipleFormRules>>) {
  let isValid = true
  Object.keys(rules).forEach(async fieldKey => {
    const rule = rules[fieldKey]

    const { validator, ...restRule } = rule
    // validator独立校验
    if (validator) {
      let errorMsg = await validator(item[fieldKey], item, internalData.value)
      errorTip[fieldKey] = errorMsg
      if (errorMsg) {
        isValid = false
        return
      }
    }
    for (const key in restRule) {
      let rulesIsArray = Array.isArray(restRule[key])

      const errorMsg = validators[key](
        item[fieldKey],
        rulesIsArray ? restRule[key][0] : restRule[key],
        rulesIsArray ? restRule[key][1] : undefined
      )

      errorTip[fieldKey] = errorMsg
      if (errorMsg) {
        isValid = false
        break
      }
    }
  })

  return isValid
}

const clearValidate = () => {
  for (const key in errorTip) {
    errorTip[key] = undefined
  }
}

/** 保存 */
const saveRow = (item: any, i: number) => {
  let valid = validate(item, columnRules.value)
  if (!valid) return
  delete item['__new__']
  editingIndex.value = -1
  emit('save', item, internalData.value)
  emit('change', internalData.value)
}

/** 删除 */
const deleteRow = (item: any, index: number) => {
  internalData.value.splice(index, 1)
  if (index === editingIndex.value) {
    editingIndex.value = -1
  } else if (editingIndex.value > index) {
    editingIndex.value = index
  }
  emit('delete', item)
  emit('change', internalData.value)
}

const handleEnterEdit = (index: number) => {
  let preEditItem = internalData.value[editingIndex.value]
  if (preEditItem?.__new__) {
    internalData.value = [
      ...internalData.value.slice(0, editingIndex.value),
      ...internalData.value.slice(editingIndex.value + 1)
    ]
  }
  editingIndex.value = index
}

/**
 * 退出编辑
 * 1. 更新状态下退出正常退出
 * 2. 新增状态下退出删除
 */
const handleExitEdit = (item: any, index: number) => {
  if (item.__new__) {
    internalData.value = [
      ...internalData.value.slice(0, index),
      ...internalData.value.slice(index + 1)
    ]
    clearValidate()
  }
  editingIndex.value = -1
}

defineExpose({
  addTo,
  clearValidate
})
</script>
