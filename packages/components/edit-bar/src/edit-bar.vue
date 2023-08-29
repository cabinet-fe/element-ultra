<template>
  <div :class="ns.b()">
    <div :class="ns.e('tools')">
      <span :class="ns.e('title')">{{ title }}</span>
      <slot name="tools">
        <span :class="ns.e('tools-icon')">
          <el-icon @click="emit('create')" :size="16"><Plus /></el-icon>
        </span>
      </slot>
    </div>

    <el-tree
      v-if="tree"
      :data="data"
      :props="{
        children: childrenKey,
        value: valueKey,
        label: labelKey
      }"
      :expand-on-click-node="false"
      highlight-current
      height="calc(100% - 40px)"
      @current-change="onSelect"
    >
      <template #default="{ data, node }">
        <div
          style="width: 100%"
          :class="{
            [ns.e('tree-item')]: true,
            [ns.em('item', 'active')]: data[valueKey] === itemId
          }"
        >
          <slot v-bind="data">
            <span :class="ns.e('item-label')">{{ data[labelKey] }}</span>
          </slot>

          <span @click.stop :class="ns.e('action')">
            <el-icon
              @click="emit('create', data, node)"
              :size="16"
              style="margin-right: 4px"
            >
              <Plus />
            </el-icon>
            <el-icon
              @click="emit('update', data, node)"
              :size="16"
              style="margin-right: 4px"
            >
              <Edit />
            </el-icon>
            <el-popconfirm title="确定删除吗?" @confirm="onDelete(data)">
              <template #reference>
                <el-icon :size="16"><Delete /></el-icon>
              </template>
            </el-popconfirm>
          </span>
        </div>
      </template>
    </el-tree>

    <el-scrollbar v-else ref="listRef" tag="ul" :class="ns.e('list')">
      <li
        v-for="item of data"
        :key="item[valueKey]"
        :class="{
          [ns.e('item')]: true,
          [ns.em('item', 'active')]: item[valueKey] === itemId
        }"
        @click="onSelect(item)"
        tabindex="0"
      >
        <span v-if="sortable" :class="ns.e('handle')"></span>
        <div :class="ns.e('item-content')">
          <slot v-bind="item">
            <span :class="ns.e('item-label')">{{ item[labelKey] }}</span>
          </slot>
        </div>

        <span @click.stop :class="ns.e('action')">
          <el-icon
            @click="emit('update', item)"
            :size="16"
            style="margin-right: 4px"
          >
            <Edit />
          </el-icon>
          <el-popconfirm title="确定删除吗?" @confirm="onDelete(item)">
            <template #reference>
              <el-icon :size="16"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </span>
      </li>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, onMounted, watch, onBeforeUnmount } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import ElScrollbar from '@element-ultra/components/scrollbar'
import ElIcon from '@element-ultra/components/icon'
import ElPopconfirm from '@element-ultra/components/popconfirm'
import ElTree, { type TreeNode } from '@element-ultra/components/tree'
import { editBarProps } from './edit-bar'
import Sortable from 'sortablejs'
import { Edit, Delete, Plus } from 'icon-ultra'

defineOptions({
  name: 'ElEditBar'
})

const ns = useNamespace('edit-bar')

const props = defineProps(editBarProps)

const emit = defineEmits<{
  (e: 'create', data?: any, node?: TreeNode): void
  (e: 'update', data: any, node?: TreeNode): void
  (e: 'select', id: string | number | null, item: any): void
  (e: 'update:modelValue', modelValue: string | number | null, item: any): void
  (e: 'delete', id: any, item: any): void
  (e: 'sorted', list: any[], from: number, to: number): void
}>()

let itemId = shallowRef<any>(null)

watch(
  () => props.modelValue,
  v => {
    itemId.value !== v && (itemId.value = v)
  },
  { immediate: true }
)

// 排序相关
const listRef = shallowRef<InstanceType<typeof ElScrollbar>>()

let sortInstance: Sortable

const getSortInstance = () => {
  if (props.tree) return

  if (!listRef.value?.viewRef) return
  const { viewRef } = listRef.value

  sortInstance = new Sortable(viewRef, {
    animation: 150,
    ghostClass: 'el-edit-bar__ghost',
    handle: '.el-edit-bar__handle',

    onSort(e) {
      const { oldIndex, newIndex } = e
      const { data } = props
      if (oldIndex === undefined || newIndex === undefined || !data) return
      data.splice(newIndex, 0, data.splice(oldIndex, 1)[0])
      emit('sorted', data, oldIndex, newIndex)
    }
  })
}

onMounted(() => {
  props.sortable && getSortInstance()
})

onBeforeUnmount(() => {
  sortInstance?.destroy()
})

watch(
  () => props.sortable,
  v => {
    if (v) {
      listRef.value && getSortInstance()
    } else {
      sortInstance?.destroy()
    }
  }
)

const onSelect = (item: any) => {
  if (itemId.value === item[props.valueKey]) {
    itemId.value = null
  } else {
    itemId.value = item[props.valueKey]
  }
  emit('select', itemId.value, item)
  emit('update:modelValue', itemId.value, item)
}

const onDelete = (item: any) => {
  emit('delete', item[props.valueKey], item)
}

watch(
  () => props.data,
  data => {
    if (data && data.length && props.defaultSelect) {
      onSelect(data[0])
    }
  },
  { immediate: true }
)
</script>
