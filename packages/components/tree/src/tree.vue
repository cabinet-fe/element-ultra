<template>
  <div
    :class="[ns.b(), { [ns.m('highlight-current')]: highlightCurrent }]"
    role="tree"
    :style="containerStyle"
    ref="treeContainer"
  >
    <fixed-size-list
      v-if="isNotEmpty && listHeight"
      :class-name="ns.b('virtual-list')"
      :data="flattenTree"
      :total="flattenTree.length"
      :height="listHeight"
      :item-size="itemSize"
      :perf-mode="perfMode"
    >
      <template #default="{ data, index, style }">
        <el-tree-node
          :key="data[index].key"
          :style="style"
          :node="data[index]"
          :expanded="isExpanded(data[index])"
          :show-checkbox="showCheckbox"
          :checked="isChecked(data[index])"
          :indeterminate="isIndeterminate(data[index])"
          :disabled="isDisabled(data[index])"
          :current="isCurrent(data[index])"
          :hidden-expand-icon="isForceHiddenExpandIcon(data[index])"
          @click="handleNodeClick"
          @toggle="toggleExpand"
          @check="handleNodeCheck"
        ></el-tree-node>
      </template>
    </fixed-size-list>
    <div v-else :class="ns.e('empty-block')">
      <span :class="ns.e('empty-text')">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  useAttrs,
  useSlots,
watch
} from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { FixedSizeList } from '@element-ultra/components/virtual-list'
import { useTree } from './composables/useTree'
import ElTreeNode from './tree-node.vue'
import { ROOT_TREE_INJECTION_KEY, treeEmits, treeProps } from './virtual-tree'

defineOptions({
  name: 'ElTree'
})

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)

const attrs = useAttrs()
const slots = useSlots()

provide(ROOT_TREE_INJECTION_KEY, {
  ctx: {
    emit,
    slots,
    attrs
  },
  props,
  instance: getCurrentInstance()!
})

const ns = useNamespace('tree')

const containerStyle = computed(() => {
  const { height } = props
  return {
    height: typeof height === 'number' ? height + 'px' : height
  }
})

const listHeight = shallowRef(0)
const treeContainer = shallowRef<HTMLDivElement>()

let observer: ResizeObserver | undefined = undefined
onMounted(() => {
  if (!treeContainer.value) return

  observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      listHeight.value = (entry.target as any).offsetHeight
    }
  })

  observer.observe(treeContainer.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = undefined
})

const {
  flattenTree,
  isNotEmpty,
  toggleExpand,
  isExpanded,
  isIndeterminate,
  isChecked,
  isDisabled,
  isCurrent,
  isForceHiddenExpandIcon,
  toggleCheckbox,
  handleNodeClick,
  handleNodeCheck,
  // expose
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  getChecked,
  getHalfChecked,
  setChecked,
  setCheckedKeys,
  setCheckedAll,
  filter,
  setData
} = useTree(props, emit)

const itemSize = 26

defineExpose({
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  getChecked,
  getHalfChecked,
  setChecked,
  setCheckedKeys,
  setCheckedAll,
  filter,
  setData
})
</script>
