<template>
  <div ref="formItemRef" :class="formItemClass">
    <label
      v-if="currentLabel"
      :for="field"
      :title="currentLabel"
      :class="ns.e('label')"
      :style="labelStyle"
    >
      <span style="margin-right: 2px">
        <slot name="label" :label="currentLabel">
          {{ currentLabel }}
        </slot>
      </span>

      <ElTooltip v-if="tips" :content="tips">
        <ElIcon>
          <QuestionFilled />
        </ElIcon>
      </ElTooltip>
    </label>

    <div :class="ns.e('content')">
      <slot></slot>

      <transition name="el-zoom-in-top">
        <div v-if="errorVisible" :class="ns.e('error')">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, nextTick, provide } from 'vue'
import { formItemKey, formKey } from '@element-ultra/tokens'
import { addUnit } from '@element-ultra/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { CSSProperties } from 'vue'
import ElIcon from '@element-ultra/components/icon'
import ElTooltip from '@element-ultra/components/tooltip'
import { useNamespace, useSize } from '@element-ultra/hooks'

export default defineComponent({
  name: 'ElFormItem',
  componentName: 'ElFormItem',

  components: {
    QuestionFilled,
    ElIcon,
    ElTooltip
  },

  props: {
    label: String,
    field: String,
    tips: String,
    labelWidth: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props) {
    const elForm = inject(formKey)
    const ns = useNamespace('form-item')
    const validateMessage = ref('')
    const formItemRef = ref<HTMLDivElement>()

    const labelStyle = computed(() => {
      const ret: CSSProperties = {}

      if (!elForm) return ret

      const { props } = elForm
      if (props.labelPosition === 'top') return ret
      const labelWidth = addUnit(props.labelWidth)
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    })

    const isRequired = computed(() => {
      if (!elForm || !props.field) return false
      return elForm.formRules?.[props.field]?.required
    })

    const validate = async () => {
      if (!props.field || !elForm) return null
      const errMsg = await elForm?.validateField(props.field)
      validateMessage.value = errMsg || ''
      return !errMsg
    }

    const clearValidate = () => {
      validateMessage.value = ''
    }

    // 重置字段值
    const reset = () => {
      if (!props.field) return

      elForm?.resetField(props.field)

      nextTick(() => clearValidate())
    }

    const formItem = {
      reset,
      clearValidate,
      validate
    }

    provide(formItemKey, formItem)

    const formItemSize = useSize({ props })

    const formItemClass = computed(() => {
      const ret = [ns.b(), ns.m(formItemSize.value)]

      isRequired.value && ret.push('is-required')
      errorVisible.value && ret.push('is-error')

      return ret
    })

    const errorVisible = computed(() => !!validateMessage.value)

    const currentLabel = computed(() =>
      props.label ? props.label + (elForm?.props.labelSuffix || '') : ''
    )

    return {
      formItemRef,
      formItemClass,
      errorVisible,
      elForm,
      labelStyle,
      validate,
      validateMessage,
      reset,
      clearValidate,
      currentLabel,
      ns
    }
  }
})
</script>
