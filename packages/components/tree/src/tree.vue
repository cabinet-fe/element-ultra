<template>
  <div :class="[ns.b(), { [ns.m('highlight-current')]: highlightCurrent }]" role="tree">
    <fixed-size-list
      v-if="isNotEmpty"
      :class-name="ns.b('virtual-list')"
      :data="flattenTree"
      :total="flattenTree.length"
      :height="height"
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
      <span :class="ns.e('empty-text')">{{ emptyText ?? t('el.tree.emptyText') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, provide, useAttrs, useSlots } from 'vue'
import { useLocale, useNamespace } from '@element-ultra/hooks'
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

const { t } = useLocale()
const ns = useNamespace('tree')
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
  getCheckedKeys,
  getCheckedNodes,
  getHalfCheckedKeys,
  getHalfCheckedNodes,
  setChecked,
  setCheckedKeys,
  filter,
  setData
} = useTree(props, emit)

const itemSize = 26

defineExpose({
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  getCheckedKeys,
  getCheckedNodes,
  getHalfCheckedKeys,
  getHalfCheckedNodes,
  setChecked,
  setCheckedKeys,
  filter,
  setData
})
</script>
