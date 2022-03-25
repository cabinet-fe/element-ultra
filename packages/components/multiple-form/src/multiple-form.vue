<template>
  <div :class="ns.b()">
    <div :class="ns.e('button')">
      <el-button @click="add">增加</el-button>
    </div>

    <table :class="ns.e('table')">
      <thead>
        <tr>
          <th
            v-for="column of columns"
            :class="{ 'is-required': columnRules[column.key]?.required }"
          >
            <el-tooltip
              v-if="errorTip[column.key]"
              placement="top"
              :visible="true"
              effect="dark"
              :content="errorTip[column.key]"
            >
              <span>{{ column.name }} --- {{ errorTip[column.key] }}</span>
            </el-tooltip>

            <template v-else>
              {{ column.name }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, i) of internalData">
          <template v-if="item._isInEdit === true">
            <td v-for="node of getChildren({ row: item })">
              <component :is="node" />
            </td>

            <td>
              <el-button type="primary" text @click="saveRow(item)">
                保存
              </el-button>
              <el-button type="primary" text @click="item._isInEdit = false">
                取消
              </el-button>
            </td>
          </template>

          <template v-else>
            <td v-for="(node, index) of getChildren({ row: item })">
              {{ item[columns[index]?.key] }}
            </td>

            <td>
              <el-button type="primary" text @click="item._isInEdit = true">
                编辑
              </el-button>
              <el-button type="primary" text @click="deleteBtn(item, i)">
                删除
              </el-button>
              <el-button type="primary" text @click="addToNextLine(item, i)">
                增加
              </el-button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import {
  computed,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  useSlots,
  watch,
} from 'vue'
import {
  multipleFormProps,
  type MultipleColumns,
  type MultipleColumnsRules,
} from './multiple-form'
import ElButton from '@element-ultra/components/button'
import ElTooltip from '@element-ultra/components/tooltip'
import { objectPick } from '@vueuse/core'
import { emit } from 'process'

defineOptions({
  name: 'ElMultipleForm',
})

const ns = useNamespace('multiple-form')

const props = defineProps(multipleFormProps)

const slots = useSlots()

const internalData = ref<any[]>([])

const isShow = ref<boolean>(true)

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
const errorTip = computed(() => {
  return props.columns.reduce((acc, column) => {
    acc[column.key] = undefined
    return acc
  }, shallowReactive({}))
})
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
    immediate: true,
  }
)

function getChildren(scope: any) {
  return slots.default?.(scope) || []
}

/** 增加 */
const add = () => {
  let template = props.columns.reduce((acc, cur) => {
    acc[cur.key] = ''
    return acc
  }, {} as Record<string, any>)

  internalData.value.push({
    ...(template as any),
    _isInEdit: true,
  })
}

/** 增加到下一行 */
const addToNextLine = (item: any, index: number) => {
  internalData.value.splice(index + 1, 0, { _isInEdit: true })
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
  },
}

/** 验证 */
function validate(data: any, rules: Record<string, MultipleColumnsRules>) {
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

      errorTip.value[item] = errorMsg
      if (errorMsg) {
        isValid = false
        break
      }
    }
  })

  return isValid
}

/** 保存 */
const saveRow = (item: any) => {
  let valid = validate(item, columnRules.value)
  if (!valid) return
  item._isInEdit = false
}

/** 删除 */
const deleteBtn = (item: object, index: number) => {
  internalData.value.splice(index, 1)
}
</script>
