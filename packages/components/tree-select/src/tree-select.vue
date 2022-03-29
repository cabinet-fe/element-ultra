<template>
  <div
    :class="[ns.b(), ns.m(inputSize), $attrs.class]"
    v-clickoutside="onClickOutside"
  >
    <div
      :class="ns.e('input')"
      @click="showTree"
      @[closeEvent]="showCloseIcon"
      @mouseleave="hideCloseIcon"
      ref="inputRef"
    >
      <div v-if="$slots.prefix" :class="{ [ns.e('prefix')]: $slots.prefix }">
        <slot name="prefix"></slot>
      </div>
      <div :class="ns.e('content')">
        <input
          type="text"
          :value="label"
          @input="handleInput"
          :class="ns.e('text')"
          :placeholder="placeholder"
          v-if="!multiple"
        />
        <div :class="ns.e('tag')" v-else>
          <el-tag
            v-if="!filterable"
            v-for="(tag, i) in selected"
            :key="tag.id"
            closable
            @close="handleCloseTag(tag, i)"
            :class="ns.e('item')"
            :size="tagSize"
            :type="tagType"
            :hit="tagHit"
          >
            {{ tag[labelKey] }}
          </el-tag>
          <input
            type="text"
            v-model="query"
            :class="ns.e('query')"
            :placeholder="!filterable ? '' : placeholder"
            @keydown.delete.stop="handleDelete"
          />
        </div>
      </div>
      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon === 'down'" />
        <arrow-up v-show="icon === 'up'" />
        <close
          :class="ns.e('close')"
          v-show="icon === 'close'"
          @click.stop="handleClear"
        />
      </el-icon>
    </div>
    <transition name="el-zoom-in-top">
      <div :class="ns.e('dropdown')" v-show="treeVisible">
        <span :class="ns.e('triangle')"></span>
        <el-tree
          :data="data"
          :check-strictly="checkStrictly"
          ref="treeRef"
          node-key="id"
          default-expand-all
          :props="{ value: valueKey, label: labelKey, children: childrenKey }"
          @node-click="handleNodeClick"
          @check-change="handleNodeCheck"
          :show-checkbox="multiple"
          :class="ns.e('tree')"
          :filter-method="filterMethod"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace, useSize, useFormItem } from '@element-ultra/hooks'
import { ref, watch, computed, shallowRef, onMounted } from 'vue'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { ClickOutside } from '@element-ultra/directives'
import { Close, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { isEqual } from 'lodash-unified'

// 公共 start
const ns = useNamespace('tree-select')

defineOptions({
  name: 'ElTreeSelect',
  directives: {
    clickoutside: ClickOutside,
  },
})

const props = defineProps(treeSelectProps)

let {
  data,
  multiple,
  clearable,
  checkStrictly,
  placeholder,
  tagSize,
  tagType,
  tagHit,
  valueKey,
  labelKey,
  childrenKey,
} = props

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: string | number,
    label: string,
    item: Record<string, any>
  ): void
  (
    e: 'update:modelValue',
    value: string[] | number[],
    label: string[],
    item: Record<string, any>[]
  ): void
}>()
/** 输入框的显示、隐藏 */
const filterable = computed(() => {
  return selected.value.length === 0
})

const onClickOutside = () => {
  hideTree()
}

const emitModelValue = (
  value: string | number,
  label: string,
  item: Record<string, any>
) => {
  emit('update:modelValue', value, label, item)
}

onMounted(() => {
  const { modelValue } = props
  multiple ? (selected.value = modelValue) : (label.value = modelValue)
})

const { formItem } = useFormItem()
watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (!isEqual(val, oldVal)) {
      formItem?.validate()
    }
  },
  {
    deep: true,
  }
)
// 公共 end

// 输入框 start
const inputSize = useSize()
const inputRef = ref<HTMLInputElement>()
const icon = ref<'down' | 'up' | 'close'>('down')
const query = ref<string>('')
/** 多选值 */
const selected = ref<Record<string, any>[]>([])
/** 单选值 */
const label = ref<string | number>('')
/** 根据clearable属性动态绑定清空按钮 */
const closeEvent = computed(() => {
  return clearable ? 'mouseover' : ''
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
// 输入框 end

// 标签 start
/** 关闭标签 */
const handleCloseTag = (data: Record<string, any>, i: number) => {
  selected.value.splice(i, 1)
  treeRef.value?.setChecked(data.id, false)
  emitModelValue(
    props.modelValue.slice(0, i).concat(props.modelValue.slice(i + 1)),
    selected.value.map((item) => item[labelKey]),
    selected.value
  )
}
// 标签 end

// 树 start
const treeVisible = ref(false)
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
/** 单选 */
const handleNodeClick = (data: Record<string, any>) => {
  label.value = data[labelKey]
  emit('update:modelValue', data[valueKey], data[labelKey], data)
}
/** 多选 */
const handleNodeCheck = () => {
  const nodes = treeRef.value?.getCheckedNodes() ?? []
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
// 树 end
</script>
