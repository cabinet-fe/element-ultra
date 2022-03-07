<template>
  <div ref="formItemRef" class="el-form-item" :class="formItemClass">
    <label
      v-if="currentLabel"
      :for="field"
      class="el-form-item__label"
      :style="labelStyle"
    >
      <slot name="label" :label="currentLabel">
        {{ currentLabel }}
      </slot>

      <QuestionFilled v-if="tips" />
    </label>

    <div class="el-form-item__content">
      <slot></slot>

      <transition name="el-zoom-in-top">
        <div v-if="errorVisible" class="el-form-item__error">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  nextTick,
  provide,
} from 'vue'
import { elFormItemKey, elFormKey } from '@element-ultra/tokens'
import { addUnit } from '@element-ultra/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElFormItem',
  componentName: 'ElFormItem',

  components: {
    QuestionFilled,
  },

  props: {
    label: String,
    field: String,
    tips: String,
    labelWidth: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const elForm = inject(elFormKey)

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
      return elForm.formRules.value[props.field].required
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

    // TODO跳转到第一个报错的位置
    const elFormItem = {
      // $el: formItemRef,
      reset,
      clearValidate,
      validate,
    }

    provide(elFormItemKey, elFormItem)

    onMounted(() => {
      if (props.field) {
        elForm?.addFormItem(props.field, elFormItem)
      }
    })

    onBeforeUnmount(() => {
      props.field && elForm?.deleteFormItem(props.field)
    })

    const formItemClass = computed(() => ({
      'is-required': isRequired.value,
      'is-error': errorVisible.value,
    }))

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
    }
  },
})
</script>
