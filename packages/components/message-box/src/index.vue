<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <el-overlay
      v-show="visible"
      :z-index="zIndex"
      :overlay-class="['is-message-box', modalClass]"
      :mask="modal"
    >
      <div
        class="el-overlay-message-box"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <div
          ref="rootRef"
          v-trap-focus
          role="dialog"
          :aria-label="title || 'dialog'"
          aria-modal="true"
          :class="[
            'el-message-box',
            customClass,
            { 'el-message-box--center': center, 'is-draggable': draggable }
          ]"
          :style="customStyle"
          @click.stop=""
        >
          <div
            v-if="title !== null && title !== undefined"
            ref="headerRef"
            class="el-message-box__header"
          >
            <div class="el-message-box__title">
              <el-icon
                v-if="iconComponent && center"
                class="el-message-box__status"
                :class="typeClass"
              >
                <component :is="iconComponent" />
              </el-icon>
              <span>{{ title }}</span>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="el-message-box__headerbtn"
              aria-label="Close"
              @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
              @keydown.prevent.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            >
              <el-icon class="el-message-box__close">
                <close />
              </el-icon>
            </button>
          </div>
          <div class="el-message-box__content">
            <div class="el-message-box__container">
              <el-icon
                v-if="iconComponent && !center && hasMessage"
                class="el-message-box__status"
                :class="typeClass"
              >
                <component :is="iconComponent" />
              </el-icon>
              <div v-if="hasMessage" class="el-message-box__message">
                <slot>
                  <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                  <p v-else v-html="message"></p>
                </slot>
              </div>
            </div>
            <div v-show="showInput" class="el-message-box__input">
              <el-input
                ref="inputRef"
                v-model="inputValue"
                :type="inputType"
                :placeholder="inputPlaceholder"
                :class="{ invalid: validateError }"
                @keydown.prevent.enter="handleInputEnter"
              />
              <div
                class="el-message-box__errormsg"
                :style="{
                  visibility: !!editorErrorMessage ? 'visible' : 'hidden'
                }"
              >
                {{ editorErrorMessage }}
              </div>
            </div>
          </div>
          <div class="el-message-box__btns">
            <el-button
              v-if="showCancelButton"
              :loading="cancelButtonLoading"
              :class="[cancelButtonClass]"
              :round="roundButton"
              :size="btnSize"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
            >
              {{ cancelButtonText }}
            </el-button>
            <el-button
              v-show="showConfirmButton"
              ref="confirmRef"
              type="primary"
              :loading="confirmButtonLoading"
              :class="[confirmButtonClasses]"
              :round="roundButton"
              :disabled="confirmButtonDisabled"
              :size="btnSize"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
            >
              {{ confirmButtonText }}
            </el-button>
          </div>
        </div>
      </div>
    </el-overlay>
  </transition>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  reactive,
  ref,
  toRefs
} from 'vue'
import ElButton from '@element-ultra/components/button'
import { TrapFocus } from '@element-ultra/directives'
import {
  useModal,
  useLockscreen,
  useRestoreActive,
  usePreventGlobal,
  useDraggable,
  useSameTarget,
  useZIndex
} from '@element-ultra/hooks'
import ElInput from '@element-ultra/components/input'
import { ElOverlay } from '@element-ultra/components/overlay'
import {
  on,
  off,
  isValidComponentSize,
  TypeComponents,
  TypeComponentsMap
} from '@element-ultra/utils'
import { EVENT_CODE } from '@element-ultra/shared'
import { ElIcon } from '@element-ultra/components/icon'

import type { PropType } from 'vue'
import type { ComponentSize } from '@element-ultra/shared'
import type { Action, MessageBoxState, MessageBoxType } from './message-box.type'

export default defineComponent({
  name: 'ElMessageBox',
  directives: {
    TrapFocus
  },
  components: {
    ElButton,
    ElInput,
    ElOverlay,
    ElIcon,
    ...TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    draggable: Boolean,
    roundButton: {
      default: false,
      type: Boolean
    },
    container: {
      type: String, // default append to body
      default: 'body'
    },
    boxType: {
      type: String as PropType<MessageBoxType>,
      default: ''
    }
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    // const popup = usePopup(props, doClose)
    const visible = ref(false)
    const { nextZIndex } = useZIndex()
    // s represents state
    const state = reactive<MessageBoxState>({
      beforeClose: null,
      callback: null,
      cancelButtonText: '取消',
      cancelButtonClass: '',
      confirmButtonText: '确认',
      confirmButtonClass: '',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: '',
      inputPattern: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: '',
      message: null,
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex()
    })

    const typeClass = computed(() => {
      const type = state.type
      return type && TypeComponentsMap[type] ? `el-message-box-icon--${type}` : ''
    })

    const btnSize = computed(() => props.buttonSize)

    const iconComponent = computed(() => state.icon || TypeComponentsMap[state.type] || '')
    const hasMessage = computed(() => !!state.message)
    const rootRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const inputRef = ref<HTMLElement>()
    const confirmRef = ref<HTMLElement>()

    const confirmButtonClasses = computed(() => state.confirmButtonClass)

    watch(
      () => state.inputValue,
      async val => {
        await nextTick()
        if (props.boxType === 'prompt' && val !== null) {
          validate()
        }
      },
      { immediate: true }
    )

    watch(
      () => visible.value,
      val => {
        if (val) {
          if (props.boxType === 'alert' || props.boxType === 'confirm') {
            nextTick().then(() => {
              confirmRef.value?.$el?.focus?.()
            })
          }
          state.zIndex = nextZIndex()
        }
        if (props.boxType !== 'prompt') return
        if (val) {
          nextTick().then(() => {
            if (inputRef.value && inputRef.value.$el) {
              getInputElement().focus()
            }
          })
        } else {
          state.editorErrorMessage = ''
          state.validateError = false
        }
      }
    )

    const draggable = computed(() => props.draggable)
    useDraggable(rootRef, headerRef, draggable)

    onMounted(async () => {
      await nextTick()
      if (props.closeOnHashChange) {
        on(window, 'hashchange', doClose)
      }
    })

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, 'hashchange', doClose)
      }
    })

    function doClose() {
      if (!visible.value) return
      visible.value = false
      nextTick(() => {
        if (state.action) emit('action', state.action)
      })
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    }

    const overlayEvent = useSameTarget(handleWrapperClick)

    const handleInputEnter = () => {
      if (state.inputType !== 'textarea') {
        return handleAction('confirm')
      }
    }

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return
      }

      state.action = action

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose)
      } else {
        doClose()
      }
    }

    const validate = () => {
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern
        if (inputPattern && !inputPattern.test(state.inputValue || '')) {
          state.editorErrorMessage = state.inputErrorMessage || '输入的数据不合法'
          state.validateError = true
          return false
        }
        const inputValidator = state.inputValidator
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(state.inputValue)
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || '输入的数据不合法'
            state.validateError = true
            return false
          }
          if (typeof validateResult === 'string') {
            state.editorErrorMessage = validateResult
            state.validateError = true
            return false
          }
        }
      }
      state.editorErrorMessage = ''
      state.validateError = false
      return true
    }

    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs
      return (inputRefs.input || inputRefs.textarea) as HTMLElement
    }

    const handleClose = () => {
      handleAction('close')
    }

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    if (props.closeOnPressEscape) {
      useModal(
        {
          handleClose
        },
        visible
      )
    } else {
      usePreventGlobal(visible, 'keydown', (e: KeyboardEvent) => e.code === EVENT_CODE.esc)
    }

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      useLockscreen(visible)
    }

    // restore to prev active element.
    useRestoreActive(visible)

    return {
      ...toRefs(state),
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose, // for outside usage
      handleClose, // for out side usage
      handleWrapperClick,
      handleInputEnter,
      handleAction
    }
  }
})
</script>
