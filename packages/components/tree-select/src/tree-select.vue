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
            v-model="query"
            :class="ns.e('query')"
            :disabled="inputDisabled"
            @keydown.delete.stop="handleDelete"
          />
        </template>

        <!-- 单选 -->
        <template v-else>
          <input
            type="text"
            v-model="query"
            :class="ns.e('text')"
            :disabled="inputDisabled"
            @input="handleFilter"
            @focus="queryInputFocus = true"
            @blur="queryInputFocus = false"
          />

          <span v-if="!query" :class="[ns.e('placeholder'), ns.is('transparent', queryInputFocus)]">
            {{ selectedLabel || placeholder }}
          </span>
        </template>

        <!-- 输入框，可以用来对列表进行查询 -->
      </div>

      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon === 'down'" />
        <arrow-up v-show="icon === 'up'" />
        <CircleClose :class="ns.e('close')" v-show="icon === 'close'" @click.stop="handleClear" />
      </el-icon>
    </div>
  </div>

  <!-- // TODO下拉框面板， 定位的话应考虑使用tooltip来做  -->
  <teleport to="body">
    <transition name="el-zoom-in-top">
      <!-- 惰性渲染，一旦渲染了之后， 后续的渲染都采用样式渲染 -->
      <div
        :class="ns.e('dropdown')"
        v-if="treeVisible || hasRendered"
        v-show="treeVisible"
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
import { ref, watch, shallowRef, onMounted } from 'vue'
import { useNamespace, useSize, useFormItem, useDisabled } from '@element-ultra/hooks'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { ClickOutside } from '@element-ultra/directives'
import { CircleClose, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import useTreeSelect from './use-tree-select'

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
  showCloseIcon,
  hideCloseIcon,
  emitModelValue,
  setTreeChecked,
  showTree,
  hideTree,
  handleCheck,
  filterMethod,
  handleSelectChange,
  handleCloseTag
} = useTreeSelect(props, emit)

onMounted(() => {
  setTreeChecked()
})

const { formItem } = useFormItem()

const inputSize = useSize()
const inputDisabled = useDisabled()
const inputRef = ref<HTMLInputElement>()
const query = ref<string>('')
const queryInputFocus = shallowRef(false)

/** 清空输入框 */
const handleClear = () => {
  query.value = ''
  const { multiple } = props

  if (multiple) {
    emitModelValue([], [], [])
  } else {
    emitModelValue('', '', undefined)
  }

  treeRef.value?.filter('')
}

/** 过滤 */
const handleFilter = (ev: any) => {
  treeRef.value?.filter(ev.target.value)
}

/** 删除键删除 */
const handleDelete = () => {
  if (query.value) return
  const lastIndex = tagList.value.length - 1
  handleCloseTag(tagList.value[lastIndex], lastIndex)
}

// 监听值的变化
// 主要是监听外部值的变化来保证正确的视图
// 值更改的时候进行校验
// 
watch(
  () => props.modelValue,
  (val) => {
    formItem?.validate()
    setTreeChecked()
  },
  {
    immediate: true
  }
)
</script>
