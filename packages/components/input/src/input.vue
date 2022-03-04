<template>
  <div
    :class="[
      ns.b(),
      ns.m(inputSize),
      ns.is('disabled', inputDisabled),
      ns.is('exceed', inputExceed),
      {
        [ns.b('group')]: $slots.prepend || $slots.append,
        [ns.bm('group', 'append')]: $slots.append,
        [ns.bm('group', 'prepend')]: $slots.prepend,
        [ns.m('prefix')]: $slots.prefix || prefixIcon,
        [ns.m('suffix')]:
          $slots.suffix || suffixIcon || clearable || showPassword,
        [ns.m('suffix--password-clear')]: showClear && showPwdVisible,
      },
      $attrs.class,
    ]"
    :style="containerStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- input -->

    <!-- prepend slot -->
    <div v-if="$slots.prepend" :class="ns.be('group', 'prepend')">
      <slot name="prepend" />
    </div>

    <input
      ref="inputRef"
      :class="ns.e('inner')"
      v-bind="attrs"
      :type="showPassword && !passwordVisible ? 'password' : 'text'"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      :aria-label="label"
      :placeholder="placeholder"
      :style="innerStyle"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />

    <!-- prefix slot -->
    <span v-if="$slots.prefix || prefixIcon" :class="ns.e('prefix')">
      <span :class="ns.e('prefix-inner')">
        <slot name="prefix"></slot>
        <el-icon v-if="prefixIcon" :class="ns.e('icon')">
          <component :is="prefixIcon" />
        </el-icon>
      </span>
    </span>

    <!-- suffix slot -->
    <span v-if="suffixVisible" :class="ns.e('suffix')">
      <span :class="ns.e('suffix-inner')">
        <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
          <slot name="suffix"></slot>
          <el-icon v-if="suffixIcon" :class="ns.e('icon')">
            <component :is="suffixIcon" />
          </el-icon>
        </template>
        <el-icon
          v-if="showClear"
          :class="[ns.e('icon'), ns.e('clear')]"
          @mousedown.prevent
          @click="clear"
        >
          <circle-close />
        </el-icon>
        <el-icon
          v-if="showPwdVisible"
          :class="[ns.e('icon'), ns.e('clear')]"
          @click="handlePasswordVisible"
        >
          <icon-view />
        </el-icon>
        <span v-if="isWordLimitVisible" :class="ns.e('count')">
          <span :class="ns.e('count-inner')">
            {{ textLength }} / {{ attrs.maxlength }}
          </span>
        </span>
      </span>
    </span>

    <!-- append slot -->
    <div v-if="$slots.append" :class="ns.be('group', 'append')">
      <slot name="append" />
    </div>
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
import { ElIcon } from '@element-pro/components/icon'
import { CircleClose, View as IconView } from '@element-plus/icons-vue'
import { ValidateComponentsMap, isKorean } from '@element-pro/utils'
import {
  useAttrs,
  useDisabled,
  useFormItem,
  useSize,
  useNamespace,
} from '@element-pro/hooks'
import { UPDATE_MODEL_EVENT } from '@element-pro/constants'
import { inputProps, inputEmits } from './input'

import type { StyleValue } from 'vue'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend',
} as const

export default defineComponent({
  name: 'ElInput',

  components: { ElIcon, CircleClose, IconView },

  inheritAttrs: false,

  props: inputProps,
  emits: inputEmits,

  setup(props, { slots, emit, attrs: rawAttrs }) {
    const instance = getCurrentInstance()!
    const attrs = useAttrs()

    const {  formItem } = useFormItem()
    const inputSize = useSize()
    const inputDisabled = useDisabled()
    const ns = useNamespace('input')

    const inputRef = ref<HTMLInputElement>()
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const passwordVisible = ref(false)

    const containerStyle = computed(() => rawAttrs.style as StyleValue)

    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined
        ? ''
        : String(props.modelValue)
    )
    const showClear = computed(
      () =>
        props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (focused.value || hovering.value)
    )

    const showPwdVisible = computed(
      () =>
        props.showPassword &&
        !inputDisabled.value &&
        !props.readonly &&
        (!!nativeInputValue.value || focused.value)
    )
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword
    )
    const textLength = computed(() => Array.from(nativeInputValue.value).length)
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value &&
        textLength.value > Number(attrs.value.maxlength)
    )

    const setNativeInputValue = () => {
      const input = inputRef.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const calcIconOffset = (place: 'prefix' | 'suffix') => {
      const { el } = instance.vnode
      if (!el) return
      const elList: HTMLSpanElement[] = Array.from(
        el.querySelectorAll(`.${ns.e(place)}`)
      )
      const target = elList.find((item) => item.parentNode === el)

      if (!target) return

      const pendant = PENDANT_MAP[place]

      if (slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          el.querySelector(`.${ns.be('group', pendant)}`).offsetWidth
        }px)`
      } else {
        target.removeAttribute('style')
      }
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
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
        inputRef.value?.focus()
      })
    }

    const blur = () => {
      inputRef.value?.blur()
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
      inputRef.value?.select()
    }

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event)
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event)
      const text = (event.target as HTMLInputElement)?.value
      const lastCharacter = text[text.length - 1] || ''
      isComposing.value = !isKorean(lastCharacter)
    }

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event)
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '')
      emit('change', '')
      emit('clear')
      emit('input', '')
    }

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value
      focus()
    }

    const suffixVisible = computed(
      () =>
        !!slots.suffix ||
        !!props.suffixIcon ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value
    )

    watch(
      () => props.modelValue,
      () => {
        formItem?.validate()
      }
    )

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => setNativeInputValue())

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
    })

    onUpdated(() => {
      nextTick(updateIconOffset)
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
      inputRef,
      attrs,
      inputSize,
      containerStyle,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      suffixVisible,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
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
