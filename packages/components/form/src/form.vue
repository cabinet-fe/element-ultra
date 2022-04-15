<template>
  <el-grid
    tag="form"
    :cols="cols"
    :class="[ns.b(), labelPosition ? 'el-form--label-' + labelPosition : '']"
  >
    <template v-for="slot of getSlots()">
      <el-form-item v-if="isFormComponent(slot)" v-bind="slot.formItemProps">
        <component
          :key="slot.node.key || undefined"
          :is="slot.node"
          :modelValue="data[slot.field]"
          @update:model-value="data[slot.field] = $event"
        />
      </el-form-item>
      <component v-else :key="slot.node.key || undefined" :is="slot.node" />
    </template>
  </el-grid>
</template>

<script lang="ts" setup>
import {
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  provide,
  useSlots,
  type VNode,
  type VNodeArrayChildren
} from 'vue'
import ElFormItem from './form-item.vue'
import ElGrid from '@element-ultra/components/grid'
import { formKey } from '@element-ultra/tokens'
import { formComponents, formProps } from './form'
import { validators } from './form-validator'
import type { FormItemContext as FormItemCtx } from '@element-ultra/tokens'
import type { FormRules } from './form'
import { useNamespace } from '@element-ultra/hooks'
import { formDialogContextKey } from '@element-ultra/tokens'
import { isFragment, isTemplate } from '@element-ultra/utils'
import { isObject } from 'lodash'

defineOptions({
  name: 'ElForm'
})

const props = defineProps(formProps)
const emit = defineEmits<{
  (e: 'validate'): void
}>()
const slots = useSlots()
const ns = useNamespace('form')

type RuleType = keyof FormRules[string]

// 表单实例项
const formItems: Record<string, FormItemCtx> = {}

// 默认表单值
let defaultFormValues: Record<string, any> = {
  ...props.data
}

const getFormItemSpan = (span?: 'max' | number) => {
  if (!span) return ''

  if (span === 'max') {
    return '1 / -1'
  } else if (!isNaN(+span)) {
    return `span ${span}`
  } else {
    return ''
  }
}

type FormComponentSlot = {
  node: VNode
  formItemProps: { label: string; field: string; style: any; tips: string }
  field: string
}

type OtherSlot = {
  node: VNode
}

const isFormComponent = (slot: any): slot is FormComponentSlot => {
  return !!slot.field
}

const getSlots = () => {
  const vNodeList = slots.default?.() || []

  let result: Array<FormComponentSlot | OtherSlot> = []

  const recursive = (nodeList: VNodeArrayChildren) => {
    nodeList.forEach(node => {
      if (!isVNode(node)) return

      // 如果是模板或者片段则渲染children
      if ((isFragment(node) || isTemplate(node)) && Array.isArray(node.children)) {
        return recursive(node.children)
      }

      if (isObject(node.type) && formComponents.has((node.type as any).name)) {
        const { label, field, tips, span } = node.props || {}
        return result.push({
          node,
          field,
          formItemProps: {
            label,
            field,
            tips,
            style: {
              gridColumn: getFormItemSpan(span)
            }
          }
        })
      }

      result.push({ node })
    })
  }

  recursive(vNodeList)

  return result
}

// 添加和删除表单项
const addFormItem = (name: string, formItem: FormItemCtx) => {
  formItems[name] = formItem
}
const deleteFormItem = (name: string) => {
  delete formItems[name]
  // 删除表单后重置该项表单值
  resetField(name)
}

/**
 * 重置单个字段值
 * @param field 字段
 */
const resetField = (field: string) => {
  if (!props.data) return
  props.data[field] = defaultFormValues[field]
}

/** 重置所有字段 */
const resetFields = () => {
  if (!props.data) return

  for (const key in props.data) {
    props.data[key] = defaultFormValues[key]
  }
  nextTick(() => clearValidate())
}

// 清除校验
const clearValidate = (fields?: string | string[]) => {
  if (!fields) {
    Object.values(formItems).forEach(formItem => formItem.clearValidate())
  } else if (typeof fields === 'string') {
    formItems[fields].clearValidate()
  } else {
    fields.forEach(field => formItems[field].clearValidate())
  }
}

/**
 * 单个字段校验
 * @param field 需要校验的字段
 */
const validateField = async (field: string) => {
  const { data, rules } = props
  if (!data || !rules) return null

  const value = data[field]
  const rule = rules[field]
  const ruleTypes = Object.keys(rule)

  let i = -1,
    len = ruleTypes.length

  while (++i < len) {
    const ruleType = ruleTypes[i] as RuleType

    // 自定义校验器
    if (ruleType === 'validator') {
      const errMsg = await rule.validator?.(value, data, rule)
      if (errMsg) return errMsg
    } else {
      // 预置校验
      const errMsg = validators[ruleType](value, rule[ruleType]) as string | null
      if (errMsg) return errMsg
    }
  }

  return null
}

/** 校验 */
const validate = async (fields?: string | string[]) => {
  if (!fields || Array.isArray(fields)) {
    const allValidation = await Promise.all(
      (Array.isArray(fields) ? fields : Object.keys(formItems)).map(name =>
        formItems[name].validate()
      )
    )
    return allValidation.every(valid => valid) ? Promise.resolve(true) : Promise.reject(false)
  }
  if (typeof fields === 'string') {
    const valid = await formItems[fields].validate()
    return valid ? Promise.resolve(true) : Promise.reject(false)
  }

  return true
}

const elForm = {
  props,

  formRules: props.rules,
  resetField,
  emit,
  addFormItem,
  deleteFormItem,
  validateField
}

provide(formKey, elForm)

const exposed = {
  validate,
  resetFields,
  clearValidate
}
// 尝试往formDialog组件中注册自己
const formDialogContext = inject(formDialogContextKey, null)

if (formDialogContext) {
  formDialogContext.addForm(exposed)

  onBeforeUnmount(() => {
    formDialogContext.deleteForm(exposed)
  })
}

defineExpose(exposed)
</script>
