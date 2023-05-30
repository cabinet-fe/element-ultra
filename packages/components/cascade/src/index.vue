<template>
  <el-tooltip
    ref="tooltipRef"
    v-model:visible="popperVisible"
    :teleported="compatTeleported"
    :popper-class="`el-cascade__dropdown ${popperClass}`"
    :popper-options="popperOptions"
    :fallback-placements="[
      'bottom-start',
      'bottom',
      'top-start',
      'top',
      'right',
      'left'
    ]"
    :stop-popper-mouse-event="false"
    :gpu-acceleration="false"
    placement="bottom-start"
    transition="el-zoom-in-top"
    effect="light"
    pure
    persistent
    @hide="hideSuggestionPanel"
  >
    <template #default>
      <div
        v-clickoutside:[popperPaneRef]="() => togglePopperVisible(false)"
        :class="[
          'el-cascade',
          realSize && `el-cascade--${realSize}`,
          { 'is-disabled': isDisabled },
          $attrs.class
        ]"
        :style="$attrs.style"
        @click="() => togglePopperVisible(readonly ? undefined : true)"
        @keydown="handleKeyDown"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <el-input
          ref="input"
          v-model="inputValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="isDisabled"
          :validate-event="false"
          :size="realSize"
          :class="{ 'is-focus': popperVisible }"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
          @focus="e => $emit('focus', e)"
          @blur="e => $emit('blur', e)"
          @input="handleInput"
        >
          <template #suffix>
            <el-icon
              v-if="clearBtnVisible"
              key="clear"
              class="el-input__icon icon-circle-close"
              @click.stop="handleClear"
            >
              <circle-close />
            </el-icon>
            <el-icon
              v-else
              key="arrow-down"
              :class="[
                'el-input__icon',
                'icon-arrow-down',
                popperVisible && 'is-reverse'
              ]"
              @click.stop="togglePopperVisible()"
            >
              <arrow-down />
            </el-icon>
          </template>
        </el-input>

        <div v-if="multiple" ref="tagWrapper" class="el-cascade__tags">
          <el-tag
            v-for="tag in presentTags"
            :key="tag.key"
            type="info"
            :size="tagSize"
            :hit="tag.hitState"
            :closable="tag.closable"
            disable-transitions
            @close="deleteTag(tag)"
          >
            <span>{{ tag.text }}</span>
          </el-tag>
          <input
            v-if="filterable && !isDisabled"
            v-model="searchInputValue"
            text
            class="el-cascade__search-input"
            :placeholder="presentText ? '' : placeholder"
            @input="e => handleInput(searchInputValue, e)"
            @click.stop="togglePopperVisible(true)"
            @keydown.delete="handleDelete"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
          />
        </div>
      </div>
    </template>

    <template #content>
      <el-cascade-panel
        v-show="!filtering"
        ref="panel"
        v-model="checkedValue"
        :options="options"
        :props="props"
        :border="false"
        :render-label="$slots.default"
        @expand-change="handleExpandChange"
        @change="handlePanelValueChange"
        @close="$nextTick(() => togglePopperVisible(false))"
      />
      <el-scrollbar
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        class="el-cascade__suggestion-panel"
        view-class="el-cascade__suggestion-list"
        @keydown="handleSuggestionKeyDown"
      >
        <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="[
              'el-cascade__suggestion-item',
              item.checked && 'is-checked'
            ]"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <el-icon v-if="item.checked"><check /></el-icon>
          </li>
        </template>
        <slot v-else name="empty">
          <li class="el-cascade__empty-text">没有数据</li>
        </slot>
      </el-scrollbar>
    </template>
  </el-tooltip>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  watch
} from 'vue'
import { isPromise } from '@vue/shared'
import { debounce } from 'lodash-unified'

import { isClient } from '@vueuse/core'
import ElCascadePanel, {
  CommonProps
} from '@element-ultra/components/cascade-panel'
import ElInput from '@element-ultra/components/input'
import ElTooltip, {
  useTooltipContentProps
} from '@element-ultra/components/tooltip'
import { useDeprecateAppendToBody } from '@element-ultra/components/popper'
import ElScrollbar from '@element-ultra/components/scrollbar'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'

import { ClickOutside as Clickoutside } from '@element-ultra/directives'
import { useFormItem, useSize } from '@element-ultra/hooks'

import {
  focusNode,
  getSibling,
  addResizeListener,
  removeResizeListener,
  isValidComponentSize
} from '@element-ultra/utils'
import {
  EVENT_CODE,
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  FORM_COMPONENT_PROPS
} from '@element-ultra/shared'
import { CircleClose, Check, ArrowDown } from 'icon-ultra'

import type { Options } from '@element-ultra/components/popper'
import type { ComputedRef, PropType, Ref } from 'vue'
import type {
  CascadeValue,
  CascadeNode,
  Tag
} from '@element-ultra/components/cascade-panel'
import type { ComponentSize } from '@element-ultra/shared'

type cascadePanelType = InstanceType<typeof ElCascadePanel>
type tooltipType = InstanceType<typeof ElTooltip>
type inputType = InstanceType<typeof ElInput>
type suggestionPanelType = InstanceType<typeof ElScrollbar>

const DEFAULT_INPUT_HEIGHT = 40

const INPUT_HEIGHT_MAP = {
  large: 36,
  default: 32,
  small: 28
}

const popperOptions: Partial<Options> = {
  modifiers: [
    {
      name: 'arrowPosition',
      enabled: true,
      phase: 'main',
      fn: ({ state }) => {
        const { modifiersData, placement } = state as any
        if (['right', 'left', 'bottom', 'top'].includes(placement)) return
        modifiersData.arrow.x = 35
      },
      requires: ['arrow']
    }
  ]
}
const COMPONENT_NAME = 'ElCascade'
export default defineComponent({
  name: COMPONENT_NAME,

  components: {
    ElCascadePanel,
    ElInput,
    ElTooltip,
    ElScrollbar,
    ElTag,
    ElIcon,
    CircleClose,
    Check,
    ArrowDown
  },

  directives: {
    Clickoutside
  },

  props: {
    ...FORM_COMPONENT_PROPS,
    ...CommonProps,
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function as PropType<
        (node: CascadeNode, keyword: string) => boolean
      >,
      default: (node: CascadeNode, keyword: string) =>
        node.text.includes(keyword)
    },
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function as PropType<(value: string) => boolean | Promise<any>>,
      default: () => true
    },
    popperClass: {
      type: String,
      default: ''
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    },
    teleported: useTooltipContentProps.teleported
  },

  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    'focus',
    'blur',
    'visible-change',
    'expand-change',
    'remove-tag'
  ],

  setup(props, { emit }) {
    let inputInitialHeight = 0
    let pressDeleteCount = 0

    const { compatTeleported } = useDeprecateAppendToBody(
      COMPONENT_NAME,
      'popperAppendToBody'
    )
    const { formItem, form } = useFormItem()

    const tooltipRef: Ref<tooltipType | null> = ref(null)
    const input: Ref<inputType | null> = ref(null)
    const tagWrapper = ref(null)
    const panel: Ref<cascadePanelType | null> = ref(null)
    const suggestionPanel: Ref<suggestionPanelType | null> = ref(null)
    const popperVisible = ref(false)
    const inputHover = ref(false)
    const filtering = ref(false)
    const inputValue = ref('')
    const searchInputValue = ref('')
    const presentTags: Ref<Tag[]> = ref([])
    const suggestions: Ref<CascadeNode[]> = ref([])
    const isOnComposition = ref(false)

    const isDisabled = computed(() => props.disabled ?? form?.props.disabled)

    const realSize = useSize({
      props
    })
    const tagSize = computed(() =>
      ['small'].includes(realSize.value) ? 'small' : 'default'
    )
    const multiple = computed(() => !!props.props.multiple)
    const readonly = computed(() => !props.filterable || multiple.value)
    const searchKeyword = computed(() =>
      multiple.value ? searchInputValue.value : inputValue.value
    )
    const checkedNodes: ComputedRef<CascadeNode[]> = computed(
      () => panel.value?.checkedNodes || []
    )
    const clearBtnVisible = computed(() => {
      if (
        !props.clearable ||
        isDisabled.value ||
        filtering.value ||
        !inputHover.value
      )
        return false

      return !!checkedNodes.value.length
    })
    const presentText = computed(() => {
      const { showAllLevels, separator } = props
      const nodes = checkedNodes.value
      return nodes.length
        ? multiple.value
          ? ' '
          : nodes[0].calcText(showAllLevels, separator)
        : ''
    })

    const checkedValue = computed<CascadeValue | undefined>({
      get() {
        return props.modelValue
      },
      set(val) {
        emit(UPDATE_MODEL_EVENT, val)
        formItem?.validate()
      }
    })

    const popperPaneRef = computed(() => {
      return tooltipRef.value?.popperRef?.contentRef
    })

    const togglePopperVisible = (visible?: boolean) => {
      if (isDisabled.value) return

      visible = visible ?? !popperVisible.value

      if (visible !== popperVisible.value) {
        popperVisible.value = visible
        input.value?.inputRef?.setAttribute('aria-expanded', `${visible}`)

        if (visible) {
          updatePopperPosition()
          nextTick(panel.value?.scrollToExpandingNode)
        } else if (props.filterable) {
          const { value } = presentText
          inputValue.value = value
          searchInputValue.value = value
        }

        emit('visible-change', visible)
      }
    }

    const updatePopperPosition = () => {
      nextTick(() => {
        tooltipRef.value?.updatePopper()
      })
    }

    const hideSuggestionPanel = () => {
      filtering.value = false
    }

    const genTag = (node: CascadeNode): Tag => {
      const { showAllLevels, separator } = props
      return {
        node,
        key: node.uid,
        text: node.calcText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled.value && !node.isDisabled
      }
    }

    const deleteTag = (tag: Tag) => {
      const node = tag.node as CascadeNode
      node.doCheck(false)
      panel.value?.calculateCheckedValue()
      emit('remove-tag', node.valueByOption)
    }

    const calculatePresentTags = () => {
      if (!multiple.value) return

      const nodes = checkedNodes.value
      const tags: Tag[] = []

      if (nodes.length) {
        const [first, ...rest] = nodes
        const restCount = rest.length

        tags.push(genTag(first))

        if (restCount) {
          if (props.collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            })
          } else {
            rest.forEach(node => tags.push(genTag(node)))
          }
        }
      }

      presentTags.value = tags
    }

    const calculateSuggestions = () => {
      const { filterMethod, showAllLevels, separator } = props
      const res = panel.value
        ?.getFlattedNodes(!props.props.checkStrictly)
        ?.filter(node => {
          if (node.isDisabled) return false
          node.calcText(showAllLevels, separator)
          return filterMethod(node, searchKeyword.value)
        })

      if (multiple.value) {
        presentTags.value.forEach(tag => {
          tag.hitState = false
        })
      }

      filtering.value = true
      suggestions.value = res!
      updatePopperPosition()
    }

    const focusFirstNode = () => {
      let firstNode!: HTMLElement

      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector(
          '.el-cascade__suggestion-item'
        )
      } else {
        firstNode = panel.value?.$el.querySelector(
          '.el-cascade-node[tabindex="-1"]'
        )
      }

      if (firstNode) {
        firstNode.focus()
        !filtering.value && firstNode.click()
      }
    }

    const updateStyle = () => {
      const inputInner = input.value?.inputRef
      const tagWrapperEl = tagWrapper.value
      const suggestionPanelEl = suggestionPanel.value?.$el

      if (!isClient || !inputInner) return

      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector(
          '.el-cascade__suggestion-list'
        )
        suggestionList.style.minWidth = `${inputInner.offsetWidth}px`
      }

      if (tagWrapperEl) {
        const { offsetHeight } = tagWrapperEl
        const height =
          presentTags.value.length > 0
            ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px`
            : `${inputInitialHeight}px`
        inputInner.style.height = height
        updatePopperPosition()
      }
    }

    const getCheckedNodes = (leafOnly: boolean) => {
      return panel.value?.getCheckedNodes(leafOnly)
    }

    const handleExpandChange = (value: CascadeValue) => {
      updatePopperPosition()
      emit('expand-change', value)
    }

    const handlePanelValueChange = (val: any, label: any, data: any) => {
      emit(CHANGE_EVENT, val, label, data)
    }

    const handleComposition = (event: CompositionEvent) => {
      const text = (event.target as HTMLInputElement)?.value
      if (event.type === 'compositionend') {
        isOnComposition.value = false
        nextTick(() => handleInput(text))
      } else {
        isOnComposition.value = true
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnComposition.value) return

      switch (e.code) {
        case EVENT_CODE.enter:
          togglePopperVisible()
          break
        case EVENT_CODE.down:
          togglePopperVisible(true)
          nextTick(focusFirstNode)
          e.preventDefault()
          break
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false)
          break
      }
    }

    const handleClear = () => {
      panel.value?.clearCheckedNodes()
      togglePopperVisible(false)
    }

    const handleSuggestionClick = (node: CascadeNode) => {
      const { checked } = node

      if (multiple.value) {
        panel.value?.handleCheckChange(node, !checked, false)
      } else {
        !checked && panel.value?.handleCheckChange(node, true, false)
        togglePopperVisible(false)
      }
    }

    const handleSuggestionKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const { code } = e

      switch (code) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          const distance = code === EVENT_CODE.up ? -1 : 1
          focusNode(
            getSibling(
              target,
              distance,
              '.el-cascade__suggestion-item[tabindex="-1"]'
            )
          )
          break
        }
        case EVENT_CODE.enter:
          target.click()
          break
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false)
          break
      }
    }

    const handleDelete = () => {
      const tags = presentTags.value
      const lastTag = tags[tags.length - 1]
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1

      if (!lastTag || !pressDeleteCount) return

      if (lastTag.hitState) {
        deleteTag(lastTag)
      } else {
        lastTag.hitState = true
      }
    }

    const handleFilter = debounce(() => {
      const { value } = searchKeyword

      if (!value) return

      const passed = props.beforeFilter(value)

      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => {
          /* prevent log error */
        })
      } else if (passed !== false) {
        calculateSuggestions()
      } else {
        hideSuggestionPanel()
      }
    }, props.debounce)

    const handleInput = (val: string, e?: KeyboardEvent) => {
      !popperVisible.value && togglePopperVisible(true)

      if (e?.isComposing) return

      val ? handleFilter() : hideSuggestionPanel()
    }

    watch(filtering, updatePopperPosition)

    watch([checkedNodes, isDisabled], calculatePresentTags)

    watch(presentTags, () => {
      nextTick(() => updateStyle())
    })

    watch(presentText, val => (inputValue.value = val), { immediate: true })

    onMounted(() => {
      const inputEl = input.value?.$el
      inputInitialHeight =
        inputEl?.offsetHeight ||
        INPUT_HEIGHT_MAP[realSize.value] ||
        DEFAULT_INPUT_HEIGHT
      addResizeListener(inputEl, updateStyle)
    })

    onBeforeUnmount(() => {
      removeResizeListener(input.value?.$el, updateStyle)
    })

    return {
      popperOptions,
      tooltipRef,
      popperPaneRef,
      input,
      tagWrapper,
      panel,
      suggestionPanel,
      popperVisible,
      inputHover,
      filtering,
      presentText,
      checkedValue,
      inputValue,
      searchInputValue,
      presentTags,
      suggestions,
      isDisabled,
      isOnComposition,
      realSize,
      tagSize,
      multiple,
      readonly,
      clearBtnVisible,
      // deprecation in ver 2.1.0
      compatTeleported,

      togglePopperVisible,
      hideSuggestionPanel,
      deleteTag,
      focusFirstNode,
      getCheckedNodes,
      handleExpandChange,
      handlePanelValueChange,
      handleKeyDown,
      handleComposition,
      handleClear,
      handleSuggestionClick,
      handleSuggestionKeyDown,
      handleDelete,
      handleInput
    }
  }
})
</script>
