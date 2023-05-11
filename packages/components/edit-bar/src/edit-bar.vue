<template>
  <div :class="ns.b()">
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
      <template #default="{ data }">
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
              @click="emit('create', data)"
              :size="16"
              style="margin-right: 4px"
            >
              <Plus />
            </el-icon>
            <el-icon
              @click="emit('update', data)"
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
        <div :class="ns.e('item-content')">
          <span v-if="sortable" :class="ns.e('handle')"></span>

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
    <div :class="ns.e('tools')">
      <slot name="tools">
        <el-button @click="emit('create')">新增</el-button>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, onMounted, watch, onBeforeUnmount } from 'vue'
import { useNamespace } from 'hooks'
import ElScrollbar from 'components/scrollbar'
import ElButton from 'components/button'
import ElIcon from 'components/icon'
import ElPopconfirm from 'components/popconfirm'
import ElTree from 'components/tree'
import { editBarProps } from './edit-bar'
import Sortable from 'sortablejs'
import { Edit, Delete, Plus } from 'icon-ultra'

defineOptions({
  name: 'ElEditBar'
})

const ns = useNamespace('edit-bar')

const props = defineProps(editBarProps)

const emit = defineEmits<{
  (e: 'create', data?: any): void
  (e: 'update', item: any): void
  (e: 'select', id: any, item: any): void
  (e: 'delete', id: any, item: any): void
  (e: 'sorted', list: any[], from: number, to: number): void
}>()

let itemId = shallowRef()

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
  itemId.value = item[props.valueKey]
  emit('select', item[props.valueKey], item)
}

const onDelete = (item: any) => {
  emit('delete', item[props.valueKey], item)
}

watch(
  () => props.data,
  data => {
    if (data && data.length) {
      onSelect(data[0])
    }
  },
  { immediate: true }
)
</script>
