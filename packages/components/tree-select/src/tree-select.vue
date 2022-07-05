<template>
  <div
    :class="[ns.b(), ns.m(inputSize), $attrs.class]"
    ref="treeSelectRef"
    @click="!treeSelectDisabled && (treeVisible ? hideTree() : showTree())"
  >
    <div
      ref="inputRef"
      :class="[
        ns.e('input'),
        ns.is('disabled', treeSelectDisabled),
        ns.is('tree-visible', treeVisible)
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div v-if="$slots.prefix" :class="{ [ns.e('prefix')]: $slots.prefix }">
        <slot name="prefix"></slot>
      </div>

      <div :class="ns.e('content')">
        <!-- 多选 -->
        <template v-if="multiple">
          <span
            v-if="!(modelValue as any[])?.length && !filterer.query && !filterer.filtering"
            :class="[ns.e('placeholder'), ns.is('transparent')]"
          >
            {{ placeholder }}
          </span>
          <template v-if="multipleLimit">
            <el-tag
              v-for="(tag, i) in tagList.slice(0, multipleLimit)"
              :key="tag.id"
              :closable="treeSelectDisabled ? false : true"
              :class="ns.e('item')"
              type="info"
              @close="handleCloseTag(tag, i)"
            >
              {{ tag[labelKey] }}
            </el-tag>
            <el-tag v-if="tagList.length - multipleLimit > 0">
              +{{ tagList.length - multipleLimit }}
            </el-tag>
          </template>
          <template v-else>
            <el-tag
              v-for="(tag, i) in tagList"
              :key="tag.id"
              :closable="treeSelectDisabled ? false : true"
              :class="ns.e('item')"
              type="info"
              @close="handleCloseTag(tag, i)"
            >
              {{ tag[labelKey] }}
            </el-tag>
          </template>
          <input
            type="text"
            v-model="filterer.query"
            :class="ns.e('query')"
            :disabled="treeSelectDisabled"
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
            :class="[
              ns.e('placeholder'),
              ns.is('transparent', filterer.focus || !selectedLabel)
            ]"
          >
            {{ selectedLabel || placeholder }}
          </span>

          <input
            type="text"
            v-model="filterer.query"
            :class="ns.e('text')"
            :disabled="treeSelectDisabled"
            @input="handleFilter"
            @focus="handleFiltererFocus"
            @blur="handleFiltererBlur"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
          />
        </template>

        <!-- 输入框，可以用来对列表进行查询 -->
      </div>

      <el-icon :class="[ns.e('icon')]">
        <CircleClose
          :class="ns.e('close')"
          v-if="!treeSelectDisabled && clearable"
          @click.stop="handleClear"
        />
        <ArrowDown v-else />
      </el-icon>
    </div>
  </div>

  <!-- // TODO下拉框面板， 定位的话应考虑使用tooltip来做  -->
  <teleport to="body">
    <transition name="el-zoom-in-top">
      <!-- 惰性渲染，一旦渲染了之后， 后续的渲染都采用样式渲染 -->
      <div
        :class="ns.e('dropdown')"
        v-show="treeVisible"
        :style="dropdownStyle"
        ref="dropdownRef"
        v-clickoutside:[treeSelectRef]="hideTree"
      >
        <span :class="[ns.e('triangle'), ns.is('top', position === 'top')]">
        </span>
        <div v-if="multiple" :class="ns.e('tools')">
          <el-button
            type="primary"
            text
            size="small"
            @click="handleToggleSelect(true)"
          >
            全选
          </el-button>
          <el-button
            type="info"
            text
            size="small"
            @click="handleToggleSelect(false)"
          >
            全不选
          </el-button>

        </div>

        <el-tree
          :data="data"
          :check-strictly="checkStrictly"
          ref="treeRef"
          :node-key="valueKey"
          :props="{
            value: valueKey,
            label: labelKey,
            children: childrenKey
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
          :selectable="selectable"
        />
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useNamespace, useSize, useDisabled } from '@element-ultra/hooks'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import ElButton from '@element-ultra/components/button'
import { ClickOutside } from '@element-ultra/directives'
import { CircleClose, ArrowDown } from '@element-plus/icons-vue'
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
  dropdownRef,
  position,
  treeSelectRef,
  treeVisible,
  clearable,
  handleMouseEnter,
  handleMouseLeave,
  emitModelValue,
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

const inputSize = useSize({ props })
const treeSelectDisabled = useDisabled()
const inputRef = ref<HTMLInputElement>()

const handleToggleSelect = (v: boolean) => {
  const tree = treeRef.value
  if (!tree) return console.warn('tree 引用为空')
  if (v) {
    tree.setCheckedAll()
    const { keys } = tree.getChecked()
    emitModelValue(keys, [], [])
  } else {
    tree.setCheckedKeys([])
    emitModelValue([], [], [])
  }
}

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
    tagList.value = []
    tree?.setCheckedKeys([])
  } else {
    emitModelValue('', '', undefined)
    selectedLabel.value = ''
    tree?.setCurrentKey('')
  }
  hideTree()
}

/** 删除键删除 */
const handleDelete = () => {
  if (filterer.query) return
  const lastIndex = tagList.value.length - 1
  handleCloseTag(tagList.value[lastIndex], lastIndex)
}
</script>
