<template>
  <div
    :class="[
      ns.b(),
      ns.is('multiple', showCheckbox),
      { [ns.m('highlight-current')]: highlightCurrent }
    ]"
    role="tree"
    :style="containerStyle"
    ref="treeContainer"
  >
    <template v-if="isNotEmpty">
      <fixed-size-list
        v-if="flattenTree.length > 240 && listHeight"
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
            :class="props.itemClass"
            :expanded="isExpanded(data[index])"
            :show-checkbox="showCheckbox"
            :checked="isChecked(data[index])"
            :indeterminate="isIndeterminate(data[index])"
            :disabled="selectable ? !selectable(data[index]) : false"
            :current="isCurrent(data[index])"
            :hidden-expand-icon="isForceHiddenExpandIcon(data[index])"
            @click="handleNodeClick"
            @toggle="toggleExpand"
            @check="handleNodeCheck"
          ></el-tree-node>
        </template>
      </fixed-size-list>

      <el-scrollbar style="height: 100%;" v-else>
        <el-tree-node
          v-for="node of flattenTree"
          :key="node.key"
          :node="node"
          :class="props.itemClass"
          :expanded="isExpanded(node)"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :indeterminate="isIndeterminate(node)"
          :disabled="selectable ? !selectable(node) : false"
          :current="isCurrent(node)"
          :hidden-expand-icon="isForceHiddenExpandIcon(node)"
          @click="handleNodeClick"
          @toggle="toggleExpand"
          @check="handleNodeCheck"
        ></el-tree-node>
      </el-scrollbar>
    </template>

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
  useSlots
} from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { FixedSizeList } from '@element-ultra/components/virtual-list'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
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

  observer = new ResizeObserver(entries => {
    listHeight.value = (entries[0]?.target as any).offsetHeight
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
  isCurrent,
  isForceHiddenExpandIcon,
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
  setData,
  getTreeNodes
} = useTree(props, emit)

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
  setData,
  getTreeNodes
})
</script>
