<template>
  <div :class="[ns.b(), ns.m(inputSize), $attrs.class]" v-clickoutside="onClickOutside">
    <div
      ref="inputRef"
      :class="[ns.e('input'), ns.is('disabled', inputDisabled)]"
      @[clickEvent]="showTree"
      @[closeEvent]="showCloseIcon"
      @mouseleave="hideCloseIcon"
    >
      <div v-if="$slots.prefix" :class="{ [ns.e('prefix')]: $slots.prefix }">
        <slot name="prefix"></slot>
      </div>
      <div :class="ns.e('content')">
        <input
          v-if="!multiple"
          type="text"
          :value="label"
          :class="ns.e('text')"
          :placeholder="placeholder"
          :disabled="inputDisabled"
          @input="handleInput"
        />
        <div :class="ns.e('tag')" v-else>
          <el-tag
            v-if="!filterable"
            v-for="(tag, i) in selected"
            :key="tag.id"
            :closable="inputDisabled ? false : true"
            :class="ns.e('item')"
            :size="tagSize"
            :type="tagType"
            :hit="tagHit"
            :color="tagColor"
            :effect="tagEffect"
            @close="handleCloseTag(tag, i)"
          >
            {{ tag[labelKey] }}
          </el-tag>
          <input
            type="text"
            v-model="query"
            :class="ns.e('query')"
            :placeholder="!filterable ? '' : placeholder"
            :disabled="inputDisabled"
            @keydown.delete.stop="handleDelete"
          />
        </div>
      </div>
      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon === 'down'" />
        <arrow-up v-show="icon === 'up'" />
        <close :class="ns.e('close')" v-show="icon === 'close'" @click.stop="handleClear" />
      </el-icon>
    </div>
    <transition name="el-zoom-in-top">
      <div :class="ns.e('dropdown')" v-show="treeVisible">
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
          :highlight-current="highlightCurrent"
          @[nodeClickEvent]="handleNodeClick"
          @[checkChangeEvent]="handleNodeCheck"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace, useSize, useFormItem, useDisabled } from '@element-ultra/hooks'
import { ref, watch, computed, shallowRef, onMounted, nextTick } from 'vue'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { ClickOutside } from '@element-ultra/directives'
import { Close, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { isEqual } from 'lodash-unified'
// common start
const ns = useNamespace('tree-select')

defineOptions({
  name: 'ElTreeSelect',
  directives: {
    clickoutside: ClickOutside
  }
})

const props = defineProps(treeSelectProps)

let {
  // common
  multiple,
  // input
  clearable,
  placeholder,
  // tag
  tagSize,
  tagType,
  tagHit,
  tagColor,
  tagEffect,
  // tree
  data,
  checkStrictly,
  valueKey,
  labelKey,
  childrenKey,
  disabledKey,
  treeIndent,
  treeIcon,
  emptyText,
  highlightCurrent
} = props

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number, label: string, item: Record<string, any>): void
  (
    e: 'update:modelValue',
    value: string[] | number[],
    label: string[],
    item: Record<string, any>[]
  ): void
}>()

const filterable = computed(() => {
  return selected.value.length === 0
})

const onClickOutside = () => {
  hideTree()
}

const emitModelValue = (value: string | number, label: string, item: Record<string, any>) => {
  emit('update:modelValue', value, label, item)
}

onMounted(() => {
  nextTick(() => {
    stateInit()
  })
})

const { formItem } = useFormItem()

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (!isEqual(val, oldVal)) {
      formItem?.validate()
    }
    stateInit()
  },
  {
    deep: true
  }
)

const stateInit = () => {
  const { modelValue } = props
  if (multiple) {
    if (modelValue.length) {
      treeRef.value?.setCheckedKeys(modelValue)
      selected.value = treeRef.value?.getCheckedNodes(true) ?? []
    }
  } else {
    if (modelValue) {
      treeRef.value.setCurrentKey(modelValue)
      label.value = treeRef.value?.getCurrentNode()[labelKey] ?? ''
    }
  }
}
// common end

// input start
const inputSize = useSize()
const inputDisabled = useDisabled()
const inputRef = ref<HTMLInputElement>()
const icon = ref<'down' | 'up' | 'close'>('down')
const query = ref<string>('')
/** 多选值 */
const selected = ref<Record<string, any>[]>([])
/** 单选值 */
const label = ref<string | number>('')
const clickEvent = computed(() => {
  return inputDisabled.value ? '' : 'click'
})
const closeEvent = computed(() => {
  if (clearable && !inputDisabled.value) {
    return 'mouseover'
  } else {
    return ''
  }
})

const nodeClickEvent = computed(() => {
  return multiple ? '' : 'node-click'
})

const checkChangeEvent = computed(() => {
  return multiple ? 'check-change' : ''
})

const showTree = () => {
  treeVisible.value = true
  icon.value = 'up'
}

const hideTree = () => {
  treeVisible.value = false
  icon.value = 'down'
}

const showCloseIcon = () => {
  icon.value = 'close'
}

const hideCloseIcon = () => {
  treeVisible.value ? (icon.value = 'up') : (icon.value = 'down')
}
/** 清空输入框 */
const handleClear = () => {
  query.value = ''
  if (multiple) {
    treeRef.value?.setCheckedKeys([])
    selected.value = []
    emitModelValue([], [], [])
  } else {
    treeRef.value?.setCurrentKey(null)
    label.value = ''
    emitModelValue('', '', {})
  }
  treeRef.value?.filter('')
}
/** 手动输入 */
const handleInput = ($e: Event) => {
  treeRef.value!.filter($e.target?.value)
}
/** 监听过滤 */
watch(query, (val) => {
  treeRef.value!.filter(val)
})
const handleDelete = () => {
  if (query.value) return
  const index = selected.value.length - 1
  index >= 0 ? handleCloseTag(selected.value[index], index) : void 0
}
// input end

// tag start
/** 关闭标签 */
const handleCloseTag = (data: Record<string, any>, i: number) => {
  selected.value.splice(i, 1)
  treeRef.value?.setChecked(data.id, false)
  emitModelValue(
    props.modelValue?.slice(0, i).concat(props.modelValue.slice(i + 1)),
    selected.value.map((item) => item[labelKey]),
    selected.value
  )
}
// tag end

// tree start
const treeVisible = ref(false)
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
/** 单选 */
const handleNodeClick = (data: Record<string, any>) => {
  label.value = data[labelKey]
  emit('update:modelValue', data[valueKey], data[labelKey], data)
}
/** 多选 */
const handleNodeCheck = () => {
  const nodes = treeRef.value?.getCheckedNodes(true) ?? []
  selected.value = nodes
  const nodesValues = nodes.map((item: Record<string, any>) => item[valueKey])
  const nodesLabels = nodes.map((item: Record<string, any>) => item[labelKey])
  emitModelValue(nodesValues, nodesLabels, nodes)
}
/** 过滤方法 */
const filterMethod = (query: string, node: Record<string, any>) => {
  if (!query) return true
  return node[labelKey].includes(query)
}
// tree end
</script>
