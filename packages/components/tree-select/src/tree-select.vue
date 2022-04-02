<template>
  <div
    :class="[ns.b(), ns.m(inputSize), $attrs.class]"
    ref="treeSelectRef"
    @click="treeVisible ? hideTree() : showTree()"
  >
    <div
      ref="inputRef"
      :class="[ns.e('input'), ns.is('disabled', inputDisabled)]"
      @mouseover="showCloseIcon"
      @mouseleave="hideCloseIcon"
    >
      <div v-if="$slots.prefix" :class="{ [ns.e('prefix')]: $slots.prefix }">
        <slot name="prefix"></slot>
      </div>

      <div :class="ns.e('content')">
        <!-- 多选 -->
        <template v-if="multiple">
          <span
            v-if="!modelValue?.length && !filterer.query && !filterer.filtering"
            :class="[ns.e('placeholder'), ns.is('transparent', filterer.focus)]"
          >
            {{ placeholder }}
          </span>
          <el-tag
            v-for="(tag, i) in tagList"
            :key="tag.id"
            :closable="inputDisabled ? false : true"
            :class="ns.e('item')"
            type="info"
            @close="handleCloseTag(tag, i)"
          >
            {{ tag[labelKey] }}
          </el-tag>
          <input
            type="text"
            v-model="filterer.query"
            :class="ns.e('query')"
            :disabled="inputDisabled"
            @keydown.delete.stop="handleDelete"
            @focus="handleFiltererFocus"
            @blur="handleFiltererBlur"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
          />
        </template>

        <!-- 单选 -->
        <template v-else>
          <span
            v-if="!filterer.query && !filterer.filtering"
            :class="[ns.e('placeholder'), ns.is('transparent', filterer.focus)]"
          >
            {{ selectedLabel || placeholder }}
          </span>

          <input
            type="text"
            v-model="filterer.query"
            :class="ns.e('text')"
            :disabled="inputDisabled"
            @input="handleFilter"
            @focus="handleFiltererFocus"
            @blur="handleFiltererBlur"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
          />
        </template>

        <!-- 输入框，可以用来对列表进行查询 -->
      </div>

      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon === 'down'" />
        <arrow-up v-show="icon === 'up'" />
        <CircleClose
          :class="ns.e('close')"
          v-show="icon === 'close' && clearable"
          @click.stop="handleClear"
        />
      </el-icon>
    </div>
  </div>

  <!-- // TODO下拉框面板， 定位的话应考虑使用tooltip来做  -->
  <teleport to="body">
    <transition name="el-zoom-in-top">
      <!-- 惰性渲染，一旦渲染了之后， 后续的渲染都采用样式渲染 -->
      <div
        :class="ns.e('dropdown')"
        v-show="treeVisible || hasRendered"
        :style="dropdownStyle"
        v-clickoutside:[treeSelectRef]="hideTree"
      >
        <span :class="ns.e('triangle')"></span>
        <el-tree
          :data="data"
          :check-strictly="checkStrictly"
          ref="treeRef"
          :node-key="valueKey"
          :props="{
            value: valueKey,
            label: labelKey,
            children: childrenKey,
            disabled: disabledKey
          }"
          :show-checkbox="multiple"
          :class="ns.e('tree')"
          :filter-method="filterMethod"
          :indent="treeIndent"
          :icon="treeIcon"
          :empty-text="emptyText"
          :highlight-current="highlightCurrent && !multiple"
          @current-change="handleSelectChange"
          @check="handleCheck"
          :expand-on-click-node="false"
        />
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useNamespace, useSize, useFormItem, useDisabled } from '@element-ultra/hooks'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { ClickOutside } from '@element-ultra/directives'
import { CircleClose, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import useTreeSelect from './use-tree-select'
import useFilter from './use-filter'

const ns = useNamespace('tree-select')

defineOptions({
  name: 'ElTreeSelect',
  directives: {
    clickoutside: ClickOutside
  }
})

const props = defineProps(treeSelectProps)

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: string | number,
    label: string,
    item: Record<string, any> | undefined
  ): void
  (
    e: 'update:modelValue',
    value: (string | number)[],
    label: string[],
    item: Record<string, any>[]
  ): void
}>()

const {
  tagList,
  selectedLabel,
  dropdownStyle,
  treeRef,
  treeSelectRef,
  icon,
  hasRendered,
  treeVisible,
  clearable,
  showCloseIcon,
  hideCloseIcon,
  emitModelValue,
  setTreeChecked,
  showTree,
  hideTree,
  handleCheck,
  handleSelectChange,
  handleCloseTag
} = useTreeSelect(props, emit)

const {
  filterer,
  filterMethod,
  handleCompositionStart,
  handleCompositionEnd,
  handleFiltererBlur,
  handleFiltererFocus,
  handleFilter
} = useFilter(props, treeRef)

onMounted(() => {
  setTreeChecked()
})

const { formItem } = useFormItem()

const inputSize = useSize()
const inputDisabled = useDisabled()
const inputRef = ref<HTMLInputElement>()

/**
 * 清空
 */
const handleClear = () => {
  const { multiple } = props
  const tree = treeRef.value
  const { query } = filterer
  if (query) {
    filterer.query = ''
    treeRef.value?.filter('')
    return
  }

  if (multiple) {
    emitModelValue([], [], [])
  } else {
    emitModelValue('', '', undefined)
    selectedLabel.value = ''
    tree?.setCurrentKey('')
    hideTree()
  }
}

/** 删除键删除 */
const handleDelete = () => {
  if (filterer.query) return
  const lastIndex = tagList.value.length - 1
  handleCloseTag(tagList.value[lastIndex], lastIndex)
}

// 监听值的变化
// 主要是监听外部值的变化来保证正确的视图
// 值更改的时候进行校验
watch(
  () => props.modelValue,
  () => {
    formItem?.validate()
    // TODO 此处应该优化一下
    setTreeChecked()
  },
  {
    immediate: true
  }
)
</script>
