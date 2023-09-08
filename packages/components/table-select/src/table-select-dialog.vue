<template>
  <el-dialog
    :title="rootProps.dialogTitle"
    body-height="max"
    v-model="visible"
    :width="rootProps.dialogWidth"
    append-to-body
    :class="ns.e('dialog')"
  >
    <div
      v-if="$slots.searcher"
      ref="searcherRef"
      :class="ns.e('dialog-searcher')"
      @keyup.enter="fetchData()"
    >
      <slot name="searcher" />
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <slot name="tools" />
    </div>

    <el-table
      :class="ns.e('dialog-table')"
      :size="rootProps.size"
      :data="data"
      :columns="columns"
      :style="{
        height: tableHeight
      }"
      @row-click="handleRowClick"
      v-loading="loading"
    ></el-table>

    <el-pagination
      :class="ns.e('dialog-pagination')"
      v-if="rootProps.api && rootProps.pagination"
      v-model:currentPage="pageQuery.page"
      v-model:page-size="pageQuery.size"
      @change="fetchData(false)"
      small
      :page-sizes="[20, 40, 80, 100, 150, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <template v-if="rootProps.multiple" #footer-left>
      <span style="color: var(--el-text-color-regular); vertical-align: middle">
        已选择 {{ checkedSize }} 条
      </span>

      <el-button @click="handleClear">清空</el-button>
    </template>

    <template #footer>
      <el-button @click="toggleVisible(false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElTable } from '@element-ultra/components/table'
import { ElDialog } from '@element-ultra/components/dialog'
import { ElButton } from '@element-ultra/components/button'
import { ElPagination } from '@element-ultra/components/pagination'
import { ElLoadingDirective as vLoading } from '@element-ultra/components/loading'
import { inject, ref, watch } from 'vue'
import { tableSelectToken } from './token'
import useApi from './use-api'
import useModel from './use-model'
import useTableHeight from './use-table-height'
import useColumns from './use-columns'

const { rootProps, ns, rootEmit } = inject(tableSelectToken)!

const { fetchData, data, loading, total, pageQuery } = useApi({
  props: rootProps,
  type: 'inject'
})

watch(
  () => rootProps.api,
  api => {
    api && fetchData()
  },
  { immediate: true }
)

// 显示隐藏
const visible = ref(false)
const toggleVisible = (v: boolean) => {
  visible.value = v
}

// 数据勾选相关模型
const {
  checkedData,
  allChecked,
  selected,
  indeterminate,
  checkedSize,
  handleToggleCheck,
  toggleAllChecked,
  handleSelect,
  handleClear
} = useModel({
  props: rootProps,
  data,
  visible
})

/** 点击行 */
const handleRowClick = (ctx: { row: any }) => {
  const { row } = ctx
  if (rootProps.multiple) {
    handleToggleCheck(!checkedData.value[row[rootProps.valueKey]], row)
  } else {
    handleSelect(row)
  }
}

// 计算表格的高度
const { searcherRef, tableHeight } = useTableHeight({ props: rootProps })

// 列
const columns = useColumns({
  allChecked,
  toggleAllChecked,
  handleSelect,
  indeterminate,
  props: rootProps,
  selected,
  checkedData,
  handleToggleCheck
})

/** 提交 */
const handleSubmit = () => {
  const data: Record<string, any>[] | Record<string, any> | null =
    rootProps.multiple
      ? (Object.values(checkedData.value) as Record<string, any>[])
      : (selected.value as Record<string, any> | null)

  rootEmit('update:modelValue', data)
  rootEmit('change', data)

  toggleVisible(false)
}

defineExpose({
  open() {
    toggleVisible(true)
  },
  clear: handleClear,

  fetchData
})
</script>
