<template>
  <div :class="ns.b()">
    <el-tooltip
      ref="popperRef"
      :effect="effect"
      :fallback-placements="['bottom', 'top']"
      :popper-options="popperOptions"
      :gpu-acceleration="false"
      :hide-after="hideTimeout"
      :manual-mode="true"
      :placement="placement"
      :popper-class="[ns.e('popper'), popperClass]"
      :reference-element="referenceElementRef?.$el"
      :trigger="trigger"
      :show-after="showTimeout"
      :stop-popper-mouse-event="false"
      :virtual-ref="triggeringElementRef"
      :virtual-triggering="splitButton"
      append-to-body
      pure
      :transition="`${ns.namespace}-zoom-in-top`"
      persistent
      @show="$emit('visible-change', true)"
      @hide="$emit('visible-change', false)"
    >
      <template #content>
        <el-scrollbar
          ref="scrollbar"
          :wrap-style="wrapStyle"
          tag="ul"
          :view-class="ns.e('list')"
        >
          <el-focus-trap trapped @mount-on-focus="onMountOnFocus">
            <el-roving-focus-group
              :loop="loop"
              :current-tab-id="currentTabId"
              orientation="horizontal"
              @current-tab-id-change="handleCurrentTabIdChange"
              @entry-focus="handleEntryFocus"
            >
              <el-dropdown-collection>
                <slot name="dropdown"></slot>
              </el-dropdown-collection>
            </el-roving-focus-group>
          </el-focus-trap>
        </el-scrollbar>
      </template>
      <template v-if="!splitButton" #default>
        <div :class="dropdownTriggerKls">
          <slot name="default" />
        </div>
      </template>
    </el-tooltip>
    <template v-if="splitButton">
      <el-button-group>
        <el-button
          ref="referenceElementRef"
          :size="dropdownSize"
          :type="type"
          @click="handlerMainButtonClick"
        >
          <slot name="default" />
        </el-button>

        <el-button
          v-if="$slots.dropdown"
          ref="triggeringElementRef"
          :size="dropdownSize"
          :type="type"
          :class="ns.e('caret-button')"
        >
          <el-icon :class="ns.e('icon')"><arrow-down /></el-icon>
        </el-button>
      </el-button-group>
    </template>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  provide,
  ref,
  toRef,
  unref
} from 'vue'
import { ElButton, ElButtonGroup } from '@element-ultra/components/button'
import ElTooltip from '@element-ultra/components/tooltip'
import ElScrollbar from '@element-ultra/components/scrollbar'
import ElIcon from '@element-ultra/components/icon'
import ElFocusTrap from '@element-ultra/components/focus-trap'
import ElRovingFocusGroup from '@element-ultra/components/roving-focus-group'
import { addUnit } from '@element-ultra/utils'
import { ArrowDown } from 'icon-ultra'
import { useNamespace, useSize } from '@element-ultra/hooks'
import { ElCollection as ElDropdownCollection, dropdownProps } from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElDropdown',
  components: {
    ElButton,
    ElFocusTrap,
    ElButtonGroup,
    ElScrollbar,
    ElDropdownCollection,
    ElTooltip,
    ElRovingFocusGroup,
    ElIcon,
    ArrowDown
  },
  props: dropdownProps,
  emits: ['visible-change', 'click', 'command'],
  setup(props, { emit }) {
    const _instance = getCurrentInstance()
    const ns = useNamespace('dropdown')

    const triggeringElementRef = ref()
    const referenceElementRef = ref()
    const popperRef = ref<InstanceType<typeof ElTooltip> | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const scrollbar = ref(null)
    const currentTabId = ref<string | null>(null)
    const isUsingKeyboard = ref(false)

    const wrapStyle = computed<CSSProperties>(() => ({
      maxHeight: addUnit(props.maxHeight)
    }))
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)])

    function handleClick() {
      handleClose()
    }

    function handleClose() {
      popperRef.value?.onClose()
    }

    function handleOpen() {
      popperRef.value?.onOpen()
    }

    const dropdownSize = useSize({ props })

    function commandHandler(...args: any[]) {
      emit('command', ...args)
    }

    function onItemEnter() {
      // NOOP for now
    }

    function onItemLeave() {
      const contentEl = unref(contentRef)

      contentEl?.focus()
      currentTabId.value = null
    }

    function handleCurrentTabIdChange(id: string) {
      currentTabId.value = id
    }

    function handleEntryFocus(e: Event) {
      if (!isUsingKeyboard.value) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }

    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave
    })

    provide('elDropdown', {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, 'trigger'),
      hideOnClick: toRef(props, 'hideOnClick')
    })

    const onMountOnFocus = (e: Event) => {
      e.preventDefault()
      contentRef.value?.focus?.({
        preventScroll: true
      })
    }

    const handlerMainButtonClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleEntryFocus,
      handleClose,
      handleOpen,
      onMountOnFocus,
      popperRef,
      triggeringElementRef,
      referenceElementRef
    }
  }
})
</script>
