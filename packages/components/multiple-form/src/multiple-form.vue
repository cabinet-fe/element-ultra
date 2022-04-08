<template>
  <div :class="ns.b()">
    <div :class="ns.e('button')">
      <el-button @click="create" :icon="Plus">增加</el-button>
    </div>

    <div :class="ns.e('source')">
      <table cellpadding="0" border="0" cellspacing="0" :class="ns.e('table')">
        <colgroup>
          <col
            v-for="column of columns"
            :key="column.key"
            :style="{ width: column.width + 'px' }"
          />
        </colgroup>

        <thead>
          <tr>
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

            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) of internalData">
            <template v-if="item._isInEdit !== false">
              <td
                v-for="(node, nodexIndex) of getChildren({ row: item })"
                :style="{ textAlign: columns[nodexIndex].align }"
              >
                <component :is="node" />
              </td>

              <td>
                <el-button type="primary" :icon="Select" text @click="saveRow(item)" />
                <el-button type="primary" :icon="Close" text @click="handleExitEdit(item, i)" />
              </td>
            </template>

            <template v-else>
              <td v-for="column of columns" :style="{ textAlign: column.align }">
                {{ column.render?.(item[column.key], item, i) || item[column.key] }}
              </td>

              <td>
                <el-button type="primary" :icon="Edit" text @click="item._isInEdit = true">
                </el-button>
                <el-button type="primary" :icon="Delete" text @click="deleteRow(item, i)">
                </el-button>
                <el-button type="primary" :icon="Plus" text @click="addToNextLine(i)"> </el-button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { computed, ref, shallowReactive, useSlots, watch } from 'vue'
import { multipleFormProps, type MultipleFormColumn, type MultipleFormRules } from './multiple-form'
import ElButton from '@element-ultra/components/button'
import ElTooltip from '@element-ultra/components/tooltip'

import { Edit, Close, Plus, Select, Delete } from '@element-plus/icons-vue'

defineOptions({
  name: 'ElMultipleForm'
})

const ns = useNamespace('multiple-form')

const props = defineProps(multipleFormProps)

const slots = useSlots()

const internalData = ref<any[]>([])

const emit = defineEmits<{
  (e: 'save', row: any): void
  (e: 'delete', row: any): void
}>()

/** 列校验是否必填*/
const columnRules = computed(() => {
  return props.columns.reduce((acc, column) => {
    if (column.rules) {
      acc[column.key] = column.rules
    }
    return acc
  }, {})
})

/** 错误提示 */
const errorTip = shallowReactive({})

// 回显
watch(
  () => props.data,
  () => {
    internalData.value = props.data.map((item) => {
      if (item._isInEdit === undefined) {
        item._isInEdit = false
      }
      return item
    })
  },
  {
    immediate: true
  }
)

function getChildren(scope: any) {
  return slots.default?.(scope) || []
}

/** 创建一个空行 */
const createRow = () => {
  return props.columns.reduce((acc, cur) => {
    acc[cur.key] = undefined
    return acc
  }, {} as Record<string, any>)
}

/** 增加 */
const create = () => {
  internalData.value.push(createRow())
}

/** 增加到下一行 */
const addToNextLine = (index: number) => {
  internalData.value.splice(index + 1, 0, createRow())
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
function validate(data: any, rules: Record<string, MultipleFormRules>) {
  let isValid = true
  Object.keys(rules).forEach((item) => {
    const rule = rules[item]

    for (const key in rule) {
      let rulesIsArray = Array.isArray(rule[key])

      const errorMsg = validators[key](
        data[item],
        rulesIsArray ? rule[key][0] : rule[key],
        rulesIsArray ? rule[key][1] : undefined
      )

      errorTip[item] = errorMsg
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
const saveRow = (item: any) => {
  let valid = validate(item, columnRules.value)
  if (!valid) return
  item._isInEdit = false
  const { _isInEdit, ...result } = item
  emit('save', result)
}

/** 删除 */
const deleteRow = (item: any, index: number) => {
  internalData.value.splice(index, 1)
  const { _isInEdit, ...result } = item
  emit('delete', result)
}

/** 退出编辑 */
const handleExitEdit = (item: any, index: number) => {
  /** 如果没有_isInEdit属性则视为刚刚新增 */
  if (item._isInEdit === undefined) {
    internalData.value.splice(index, 1)
    clearValidate()
  } else {
    item._isInEdit = false
  }
}

defineExpose({
  create,
  clearValidate
})
</script>
