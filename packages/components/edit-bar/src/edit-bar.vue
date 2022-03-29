<template>
  <div :class="ns.b()">
    <el-scrollbar ref="listRef" tag="ul" :class="ns.e('list')">
      <li
        v-for="item of data"
        :key="item[valueKey]"
        :class="{
          [ns.e('item')]: true,
          [ns.em('item', 'active')]: item[valueKey] === itemId,
        }"
        @click="onSelect(item)"
      >
        <span v-if="sortable"  :class="ns.e('handle')"></span>

        <slot v-bind="item">
          <span :class="ns.e('item__label')">{{ item[labelKey] }}</span>
        </slot>

        <span @click.prevent :class="ns.e('action')">
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
import { shallowRef, onMounted, watch } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import ElScrollbar from '@element-ultra/components/scrollbar'
import ElButton from '@element-ultra/components/button'
import ElIcon from '@element-ultra/components/icon'
import ElPopconfirm from '@element-ultra/components/popconfirm'
import { editBarProps } from './edit-bar'
import Sortable from 'sortablejs'
import { Edit, Delete } from '@element-plus/icons-vue'

defineOptions({
  name: 'ElEditBar',
})

const ns = useNamespace('edit-bar')

const props = defineProps(editBarProps)

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'update', item: any): void
  (e: 'select', id: any, item: any): void
  (e: 'delete', id: any, item: any): void
  (e: 'sorted', list: any[], from: number, to: number): void
}>()

let itemId = shallowRef()

// 排序相关
const listRef = shallowRef<any>()

let sortInstance: Sortable

const getSortInstance = () => {
  sortInstance = new Sortable(listRef.value?.resize$, {
    animation: 150,
    ghostClass: 'el-edit-bar__ghost',
    handle: '.el-edit-bar__handle',
    onSort(e) {
      const { oldIndex, newIndex } = e
      const { data } = props
      if (oldIndex === undefined || newIndex === undefined || !data) return
      data.splice(newIndex, 0, data.splice(oldIndex, 1)[0])
      emit('sorted', data, oldIndex, newIndex)
    },
  })
}

onMounted(() => {
  props.sortable && getSortInstance()
})
watch(
  () => props.sortable,
  (v) => {
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

watch(() => props.data, (data) => {

  if  (data && data.length) {
    onSelect(data[0])
  }
}, { immediate: true })
</script>
