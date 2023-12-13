<template>
  <el-grid
    tag="form"
    :cols="cols"
    gap="0,8"
    ref="formRef"
    :class="[ns.b(), labelPosition ? 'el-form--label-' + labelPosition : '']"
  >
    <template :key="slot.node.key || undefined" v-for="slot of getSlots()">
      <el-form-item
        v-if="isFormComponent(slot)"
        ref="formItemRefs"
        v-bind="slot.formItemProps"
      >
        <component
          :is="slot.node"
          :modelValue="getChainValue(data, slot.field)"
          :text="
            slot.textField ? getChainValue(data, slot.textField) : undefined
          "
          @update:model-value="handleUpdateValue(slot.field, $event)"
          @update:text="handleUpdateText($event, slot.textField)"
        />
      </el-form-item>
      <component v-else :is="slot.node" />
    </template>

    {{ renderEffect() }}
  </el-grid>
</template>

<script lang="ts" setup>
import {
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  provide,
  shallowRef,
  useSlots,
  type VNode,
  type VNodeArrayChildren
} from 'vue'
import ElFormItem from './form-item.vue'
import { ElGrid } from '@element-ultra/components/grid'
import { formInjectionKey, formKey } from '@element-ultra/tokens'
import { formComponents, formProps } from './form'
import { validators } from './form-validator'
import { useNamespace } from '@element-ultra/hooks'
import {
  deepExtend,
  getChainValue,
  isFragment,
  isTemplate
} from '@element-ultra/utils'
import { isObject } from 'lodash'

type FormItemType = InstanceType<typeof ElFormItem>

defineOptions({
  name: 'ElForm'
})

const props = defineProps(formProps)
const emit = defineEmits<{
  (e: 'validate'): void
}>()
const slots = useSlots()
const ns = useNamespace('form')

// 表单实例项
const formItemRefs = shallowRef<FormItemType[]>([])
// 字段 -> 表单项实例 映射
let formItemRefsMap: Record<string, FormItemType> = {}

if (props.defaultData && props.data) {
  for (const key in props.defaultData) {
    if (key in props.data) {
      props.data[key] = props.defaultData[key]
    }
  }
}

// 组件渲染时的副作用
const renderEffect = () => {
  nextTick(() => {
    let oldMap: any = formItemRefsMap
    let ret: Record<string, FormItemType> = {}
    formItemRefs.value.forEach(item => {
      if (!item.field) return
      ret[item.field] = item
    })

    formItemRefsMap = ret

    if (!props.data) return

    // 清除已消失的组件的data数据
    for (const field in oldMap) {
      if (!formItemRefsMap[field]) {
        props.data[field] = defaultFormValues[field]
      }
    }

    oldMap = null
  })
}

// 默认表单值
let defaultFormValues: Record<string, any> = JSON.parse(
  JSON.stringify(props.data || {})
)

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

const handleUpdateValue = (field: string, val: any) => {
  const { data } = props
  if (!data) return
  let fieldItems = field.split('.')

  // 有多个字段
  if (fieldItems.length > 1) {
    let target = data
    fieldItems.slice(0, -1).forEach(field => {
      target = target[field]
    })

    target[fieldItems[fieldItems.length - 1]] = val
  } else {
    data[field] = val
  }
}

const handleUpdateText = (text: any, textField?: string) => {
  const { data } = props
  if (!data || !textField) return
  let fieldItems = textField.split('.')

  // 有多个字段
  if (fieldItems.length > 1) {
    let target = data
    fieldItems.slice(0, -1).forEach(field => {
      target = target[field]
    })

    target[fieldItems[fieldItems.length - 1]] = text
  } else {
    data[textField] = text
  }
}

type FormComponentSlot = {
  node: VNode
  formItemProps: {
    label: string
    field: string
    style: any
    tips: string
    required?: boolean
  }
  field: string
  textField?: string
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
      if (
        (isFragment(node) || isTemplate(node)) &&
        Array.isArray(node.children)
      ) {
        return recursive(node.children)
      }

      if (isObject(node.type) && formComponents.has((node.type as any).name)) {
        const props = node.props || {}

        const { label, field, tips, span, required } = props

        return result.push({
          node,
          field,
          textField: props.textField || props['text-field'],
          formItemProps: {
            label,
            field,
            tips,
            required,
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

/**
 * 重置单个字段值
 * @param field 字段
 */
const resetField = (field: string) => {
  if (!props.data) return

  props.data[field] = defaultFormValues[field]
  nextTick(() => clearValidate(field))
}

/** 重置所有字段 */
const resetFields = () => {
  if (!props.data) return
  deepExtend(props.data, defaultFormValues, true)
  /** 对表单项的值进行重置 */
  // for (const key in formItemRefsMap) {
  //   let keyList = key.split('.')
  //   if (keyList.length > 1) {
  //     let target = props.data
  //     let defaultTarget = defaultFormValues
  //     keyList.slice(0, -1).some(item => {
  //       target = target[item]
  //       defaultTarget = defaultTarget[item]
  //       return !target || !defaultTarget
  //     })
  //     const lastKey = keyList[keyList.length - 1]

  //     if (target && defaultTarget) {
  //       target[lastKey] = defaultTarget[lastKey]
  //     }
  //   } else {
  //     props.data[key] = defaultFormValues[key]
  //   }
  // }
  nextTick(() => clearValidate())
}

// 清除校验
const clearValidate = (fields?: string | string[]) => {
  if (!fields) {
    formItemRefs.value.forEach(item => item.clearValidate())
  } else if (typeof fields === 'string') {
    formItemRefsMap[fields].clearValidate()
  } else {
    fields.forEach(field => formItemRefsMap[field].clearValidate())
  }
}

/**
 * 单个字段校验
 * @param field 需要校验的字段
 */
const validateField = async (field: string) => {
  const { data, rules } = props
  if (!data || !rules) return null

  const value = getChainValue(data, field)

  let fieldRules = rules[field]

  if (!fieldRules) {
    console.warn(`表单数据中没有定义该字段: ${field}, 校验可能出现问题`)
  }
  const { validator, required, ...rule } = fieldRules || {}

  let errMsg: null | undefined | string = null

  // 优先校验必填, 以组件中传入的required属性为准
  errMsg = validators.required(value, formItemRefsMap[field].isRequired ?? required)
  if (errMsg) return errMsg

  if (!value && value !== 0) return errMsg

  errMsg = await validator?.(value, data, rule)
  if (errMsg) return errMsg

  type RuleKey = keyof Omit<typeof rule, 'children'>
  Object.keys(rule).some(type => {
    let result = validators[type as RuleKey]?.(
      value,
      rule[type as RuleKey] as any
    )
    if (result) {
      errMsg = result
      return true
    }
  })

  return errMsg
}

const formRef = shallowRef<InstanceType<typeof ElGrid>>()
/** 校验 */
const validate = async (fields?: string | string[]): Promise<boolean> => {
  let result = true

  // 没有传入字段或者传入的字段是数组
  if (!fields || Array.isArray(fields)) {
    const allValidation = await Promise.all(
      Array.isArray(fields)
        ? fields.map(field => formItemRefsMap[field]?.validate())
        : formItemRefs.value.map(formItem => formItem?.validate())
    )
    result = allValidation.every(valid => valid)
  } else if (typeof fields === 'string') {
    const valid = await formItemRefsMap[fields]?.validate()
    result = !!valid
  }

  if (!result) {
    await nextTick()
    ~(formRef.value?.$el as HTMLElement)
      ?.getElementsByClassName('el-form-item is-error')[0]
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
  }

  return result ? result : Promise.reject(result)
}

provide(formKey, {
  props,

  formRules: props.rules,
  resetField,
  emit,
  validateField
})

const exposed = {
  validate,
  resetFields,
  clearValidate
}

// 尝试往formDialog, page组件中注册自己
const formInjection = inject(formInjectionKey, null)

if (formInjection) {
  formInjection.addForm(exposed)

  onBeforeUnmount(() => {
    formInjection.deleteForm(exposed)
  })
}

defineExpose(exposed)
</script>
