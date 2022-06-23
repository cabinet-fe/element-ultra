<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', inputDisabled),
      ns.is('exceed', inputExceed),

      $attrs.class,
    ]"
    :style="containerStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <textarea
      ref="textarea"
      :class="ns.e('inner')"
      v-bind="attrs"
      :tabindex="tabindex"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="computedTextareaStyle"
      :aria-label="label"
      :placeholder="placeholder"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />
    <span v-if="isWordLimitVisible" :class="ns.e('count')">
      {{ textLength }} / {{ attrs.maxlength }}
    </span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
} from 'vue'
import { isClient } from '@vueuse/core'
import { ElIcon } from '@element-ultra/components/icon'
import { CircleClose, View as IconView } from '@element-plus/icons-vue'
import { isObject } from '@element-ultra/utils'
import {
  useAttrs,
  useDisabled,
  useFormItem,
  useNamespace,
} from '@element-ultra/hooks'
import { UPDATE_MODEL_EVENT } from '@element-ultra/constants'
import { calcTextareaHeight } from './calc-textarea-height'
import { textareaProps, textareaEmits } from './textarea'

import type { StyleValue } from 'vue'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

export default defineComponent({
  name: 'ElTextarea',

  components: { ElIcon, CircleClose, IconView },

  inheritAttrs: false,

  props: textareaProps,
  emits: textareaEmits,

  setup(props, { slots, emit, attrs: rawAttrs }) {
    const attrs = useAttrs()

    const { formItem } = useFormItem()
    const inputDisabled = useDisabled()
    const ns = useNamespace('textarea')

    const textarea = ref<HTMLTextAreaElement>()
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const _textareaCalcStyle = shallowRef(props.innerStyle)

    const containerStyle = computed(() => rawAttrs.style as StyleValue)
    const computedTextareaStyle = computed<StyleValue>(() => [
      props.innerStyle,
      _textareaCalcStyle.value,
      { resize: props.resize },
    ])
    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined
        ? ''
        : String(props.modelValue)
    )

    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        !inputDisabled.value &&
        !props.readonly
    )
    const textLength = computed(() => Array.from(nativeInputValue.value).length)
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value &&
        textLength.value > Number(attrs.value.maxlength)
    )

    const resizeTextarea = () => {
      const { autosize } = props

      if (!isClient) return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined
        _textareaCalcStyle.value = {
          ...calcTextareaHeight(textarea.value!, minRows, maxRows),
        }
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value!).minHeight,
        }
      }
    }

    const setNativeInputValue = () => {
      const input = textarea.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const handleInput = (event: Event) => {
      const { value } = event.target as TargetElement

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) return

      emit(UPDATE_MODEL_EVENT, value)
      emit('input', value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue)
    }

    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value)
    }

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        textarea.value?.focus()
      })
    }

    const blur = () => {
      textarea.value?.blur()
    }

    const handleFocus = (event: FocusEvent) => {
      focused.value = true
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      focused.value = false
      emit('blur', event)
      formItem?.validate()
    }

    const select = () => {
      textarea.value?.select()
    }

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event)
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event)
      isComposing.value = true
    }

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event)
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    watch(
      () => props.modelValue,
      () => {
        nextTick(resizeTextarea)
      }
    )

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => setNativeInputValue())

    onMounted(() => {
      setNativeInputValue()
      nextTick(resizeTextarea)
    })

    const onMouseLeave = (evt: MouseEvent) => {
      hovering.value = false
      emit('mouseleave', evt)
    }

    const onMouseEnter = (evt: MouseEvent) => {
      hovering.value = true
      emit('mouseenter', evt)
    }

    const handleKeydown = (evt: KeyboardEvent) => {
      emit('keydown', evt)
    }

    return {
      textarea,
      attrs,
      containerStyle,
      computedTextareaStyle,
      inputDisabled,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      resizeTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      select,
      focus,
      blur,
      onMouseLeave,
      onMouseEnter,
      handleKeydown,
      ns,
    }
  },
})
</script>
