<template>
  <el-grid
    tag="form"
    :cols="cols || 1"
    :class="[ns.b(), labelPosition ? 'el-form--label-' + labelPosition : '']"
  >
    <component :is="node" v-for="node of getChildren()" />
  </el-grid>
</template>

<script lang="ts" setup>
import {
  cloneVNode,
  h,
  inject,
  isVNode,
  onBeforeUnmount,
  provide,
  useSlots,
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

const wrapFormItem = (nodeList: VNodeArrayChildren, data: Record<string, any>) => {
  let result: any[] = []

  nodeList.forEach(node => {
    if (!isVNode(node)) {
      return result.push(node)
    }

    if (typeof node.type === 'object') {
      if (formComponents.has((node.type as any).name)) {
        // TODO最终将这些属性全部定义到各个组件中去
        const { label, field, tips } = node.props || {}

        if (!field) return node

        result.push(
          h(ElFormItem, { label, field, tips }, () => {
            const cloned = cloneVNode(node, {
              modelValue: data[field],
              'onUpdate:modelValue': (value: any) => {
                data[field] = value
              }
            })
            return cloned
          })
        )
      } else {
        result.push(node)
      }
    } else if (isFragment(node) || isTemplate(node)) {
      // 如果是模板或者片段则渲染children
      // children type -> string | VNodeArrayChildren | RawSlots | null
      if (Array.isArray(node.children)) {
        result = result.concat(wrapFormItem(node.children, data))
      } else {
        result.push(node.children)
      }
    } else {
      result.push(node)
    }
  })

  return result
}
/** 获取子组件vnode */
const getChildren = () => {
  const { data } = props
  const vNodeList = slots.default?.(data) || []
  if (!data) return vNodeList

  return wrapFormItem(vNodeList, data)
}
// 添加和删除表单项
const addFormItem = (name: string, formItem: FormItemCtx) => {
  formItems[name] = formItem
}
const deleteFormItem = (name: string) => {
  delete formItems[name]
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
  for (const key in formItems) {
    formItems[key].reset()
  }
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
