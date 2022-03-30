<template>
  <div
    ref="selectRef"
    v-click-outside:[popperRef]="handleClickOutside"
    :class="[ns.b(), ns.m(selectSize)]"
    @click.stop="toggleMenu"
    @mouseenter="states.comboBoxHovering = true"
    @mouseleave="states.comboBoxHovering = false"
  >
    <el-tooltip
      ref="popper"
      v-model:visible="dropdownMenuVisible"
      :teleported="compatTeleported"
      :popper-class="[ns.e('popper'), popperClass]"
      :gpu-acceleration="false"
      :stop-popper-mouse-event="false"
      :popper-options="popperOptions"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      :effect="effect"
      placement="bottom-start"
      pure
      :transition="`${ns.namespace.value}-zoom-in-top`"
      trigger="click"
      persistent
      @show="handleMenuEnter"
      @hide="states.inputValue = states.displayInputValue"
    >
      <template #default>
        <div
          ref="selectionRef"
          :class="[
            ns.e('wrapper'),
            ns.is('focused', states.isComposing),
            ns.is('hovering', states.comboBoxHovering),
            ns.is('filterable', filterable),
            ns.is('disabled', disabled)
          ]"
        >
          <div v-if="$slots.prefix">
            <slot name="prefix"></slot>
          </div>
          <div v-if="multiple" :class="ns.e('selection')">
            <template v-if="collapseTags && modelValue.length > 0">
              <div :class="ns.e('selected-item')">
                <el-tag
                  :closable="
                    !selectDisabled && !states.cachedOptions[0]?.disable
                  "
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                  @close="deleteTag($event, states.cachedOptions[0])"
                >
                  <span
                    :class="ns.e('tags-text')"
                    :style="{
                      maxWidth: `${tagMaxWidth}px`
                    }"
                    >{{ getLabel(states.cachedOptions[0]) }}</span
                  >
                </el-tag>
                <el-tag
                  v-if="modelValue.length > 1"
                  :closable="false"
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                >
                  <span
                    :class="ns.e('tags-text')"
                    :style="{
                      maxWidth: `${tagMaxWidth}px`
                    }"
                    >+ {{ modelValue.length - 1 }}</span
                  >
                </el-tag>
              </div>
            </template>

            <template v-else>
              <div
                v-for="(selected, idx) in states.cachedOptions"
                :key="idx"
                :class="ns.e('selected-item')"
              >
                <el-tag
                  :key="getValue(selected)"
                  :closable="!selectDisabled && !selected.disabled"
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                  @close="deleteTag($event, selected)"
                >
                  <span
                    :class="ns.e('tags-text')"
                    :style="{
                      maxWidth: `${tagMaxWidth}px`
                    }"
                    >{{ getLabel(selected) }}</span
                  >
                </el-tag>
              </div>
            </template>
            <div
              :class="[ns.e('selected-item'), ns.e('input-wrapper')]"
              :style="inputWrapperStyle"
            >
              <input
                :id="id"
                ref="inputRef"
                v-model-text="states.displayInputValue"
                :autocomplete="autocomplete"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                autocapitalize="off"
                :aria-expanded="expanded"
                :class="[ns.is(selectSize), ns.e('combobox-input')]"
                :disabled="disabled"
                role="combobox"
                :readonly="!filterable"
                spellcheck="false"
                text
                :name="name"
                :unselectable="expanded ? 'on' : undefined"
                @update:modelValue="onUpdateInputValue"
                @focus="handleFocus"
                @input="onInput"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @keydown.up.stop.prevent="onKeyboardNavigate('backward')"
                @keydown.down.stop.prevent="onKeyboardNavigate('forward')"
                @keydown.enter.stop.prevent="onKeyboardSelect"
                @keydown.esc.stop.prevent="handleEsc"
                @keydown.delete.stop="handleDel"
              />
              <span
                v-if="filterable"
                ref="calculatorRef"
                aria-hidden="true"
                :class="ns.e('input-calculator')"
                v-text="states.displayInputValue"
              >
              </span>
            </div>
          </div>
          <template v-else>
            <div :class="[ns.e('selected-item'), ns.e('input-wrapper')]">
              <input
                :id="id"
                ref="inputRef"
                v-model-text="states.displayInputValue"
                aria-autocomplete="list"
                aria-haspopup="listbox"
                :aria-expanded="expanded"
                autocapitalize="off"
                :autocomplete="autocomplete"
                :class="ns.e('combobox-input')"
                :disabled="disabled"
                :name="name"
                role="combobox"
                :readonly="!filterable"
                spellcheck="false"
                text
                :unselectable="expanded ? 'on' : undefined"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @focus="handleFocus"
                @input="onInput"
                @keydown.up.stop.prevent="onKeyboardNavigate('backward')"
                @keydown.down.stop.prevent="onKeyboardNavigate('forward')"
                @keydown.enter.stop.prevent="onKeyboardSelect"
                @keydown.esc.stop.prevent="handleEsc"
                @update:modelValue="onUpdateInputValue"
              />
            </div>
            <span
              v-if="filterable"
              ref="calculatorRef"
              aria-hidden="true"
              :class="[ns.e('selected-item'), ns.e('input-calculator')]"
              v-text="states.displayInputValue"
            >
            </span>
          </template>
          <span
            v-if="shouldShowPlaceholder"
            :class="[
              ns.e('placeholder'),
              ns.is(
                'transparent',
                states.isComposing ||
                  (placeholder && multiple
                    ? modelValue.length === 0
                    : !hasModelValue)
              )
            ]"
          >
            {{ currentPlaceholder }}
          </span>
          <span :class="ns.e('suffix')">
            <el-icon
              v-if="iconComponent"
              v-show="!showClearBtn"
              :class="[ns.e('caret'), nsInput.e('icon'), iconReverse]"
            >
              <component :is="iconComponent" />
            </el-icon>
            <el-icon
              v-if="showClearBtn && clearIcon"
              :class="[ns.e('caret'), nsInput.e('icon')]"
              @click.prevent.stop="handleClear"
            >
              <component :is="clearIcon" />
            </el-icon>
            <el-icon
              v-if="validateState && validateIcon"
              :class="[nsInput.e('icon'), nsInput.e('validateIcon')]"
            >
              <component :is="validateIcon" />
            </el-icon>
          </span>
        </div>
      </template>
      <template #content>
        <el-select-menu
          ref="menuRef"
          :data="filteredOptions"
          :width="popperSize"
          :hovering-index="states.hoveringIndex"
          :scrollbar-always-on="scrollbarAlwaysOn"
        >
          <template #default="scope">
            <slot v-bind="scope"></slot>
          </template>
          <template #empty>
            <slot name="empty">
              <p :class="ns.e('empty')">
                {{ emptyText ? emptyText : '' }}
              </p>
            </slot>
          </template>
        </el-select-menu>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, toRefs, reactive, vModelText } from 'vue'
import { ClickOutside } from '@element-ultra/directives'
import ElTooltip from '@element-ultra/components/tooltip'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@element-ultra/constants'
import ElSelectMenu from './select-dropdown.vue'
import useSelect from './useSelect'
import { selectInjectionKey } from './token'
import { SelectProps } from './defaults'
export default defineComponent({
  name: 'ElSelect',
  components: {
    ElSelectMenu,
    ElTag,
    ElTooltip,
    ElIcon
  },
  directives: { ClickOutside, ModelText: vModelText },
  props: SelectProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    'remove-tag',
    'clear',
    'visible-change',
    'focus',
    'blur'
  ],

  setup(props, { emit }) {
    const API = useSelect(props, emit)
    // TODO, remove the any cast to align the actual API.
    provide(selectInjectionKey, {
      props: reactive({
        ...toRefs(props),
        height: API.popupHeight
      }),
      getLabel: API.getLabel,
      getValue: API.getValue,
      onSelect: API.onSelect,
      onHover: API.onHover,
      onKeyboardNavigate: API.onKeyboardNavigate,
      onKeyboardSelect: API.onKeyboardSelect
    })

    return API
  }
})
</script>
