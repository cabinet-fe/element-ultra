<template>
  <div
    :class="[ns.b(), ns.m(inputSize)]"
    ref="treeSelectRef"
    @click="openDialog"
    v-bind="$attrs"
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
            v-if="!(modelValue as any[])?.length"
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
        </template>

        <!-- 单选 -->
        <template v-else>
          <span
            :class="[ns.e('placeholder'), ns.is('transparent', !selectedLabel)]"
          >
            {{ selectedLabel || placeholder }}
          </span>
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

  <el-dialog
    append-to-body
    v-model="treeVisible"
    :title="placeholder"
    width="400px"
    :lazy-render="false"
  >
    <div :class="ns.e('tools')">
      <el-input
        placeholder="输入关键字查询"
        v-model="filterer.query"
        @update:model-value="handleFilter"
        :class="ns.e('query')"
        :prefix-icon="Search"
        clearable
      />

      <template v-if="multiple">
        <el-button
          type="primary"
          text
          size="small"
          @click="handleToggleCheck(true)"
        >
          全选
        </el-button>
        <el-button
          type="info"
          text
          size="small"
          @click="handleToggleCheck(false)"
        >
          全不选
        </el-button>
      </template>
    </div>

    <el-tree
      :data="data"
      :check-strictly="checkStrictly"
      ref="treeRef"
      :node-key="valueKey"
      :props="treeProps"
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
      default-expand-all
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { useNamespace, useSize, useDisabled } from '@element-ultra/hooks'
import { treeSelectProps, treeSelectEmits } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElInput from '@element-ultra/components/input'
import ElIcon from '@element-ultra/components/icon'
import ElButton from '@element-ultra/components/button'
import ElDialog from '@element-ultra/components/dialog'
import { CircleClose, ArrowDown, Search } from '@element-plus/icons-vue'
import useTreeSelect from './use-tree-select'
import useFilter from './use-filter'

const ns = useNamespace('tree-select')

defineOptions({
  name: 'ElTreeSelect',
  inheritAttrs: false
})

const props = defineProps(treeSelectProps)

const treeProps = {
  value: props.valueKey,
  label: props.labelKey,
  children: props.childrenKey
}

const emit = defineEmits(treeSelectEmits)

/** 树的引用 */
const treeRef = shallowRef<InstanceType<typeof ElTree>>()

const { filterer, filterMethod, handleFilter } = useFilter(props, treeRef)

const {
  tagList,
  selectedLabel,
  treeSelectRef,
  treeVisible,
  clearable,
  handleMouseEnter,
  handleMouseLeave,
  emitModelValue,
  openDialog,
  closeDialog,
  handleCheck,
  handleSelectChange,
  handleCloseTag
} = useTreeSelect(props, emit, treeRef, filterer)

const inputSize = useSize({ props })
const treeSelectDisabled = useDisabled({ props })
const inputRef = ref<HTMLInputElement>()

const handleToggleCheck = (v: boolean) => {
  const tree = treeRef.value
  if (!tree) return console.warn('tree 引用为空')
  if (v) {
    tree.setCheckedAll()
    const { keys, nodes } = tree.getChecked()
    emitModelValue(
      keys,
      nodes.map(v => v[props.labelKey]),
      nodes
    )
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
    tree?.filter('')
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
  closeDialog()
}
</script>
