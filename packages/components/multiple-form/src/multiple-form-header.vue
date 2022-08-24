<template>
  <colgroup>
    <col style="width: 60px" />
    <col
      v-for="column of visibleColumns"
      :key="column.key"
      :style="{ minWidth: column.minWidth + 'px', width: column.width + 'px' }"
    />
    <col
      v-if="!multipleFormProps.disabled"
      :style="{ width: multipleFormProps.actionWidth + 'px' }"
    />
  </colgroup>

  <thead>
    <tr>
      <th style="text-align: center">序号</th>

      <th
        v-for="column of visibleColumns"
        :class="{ 'is-required': columnRules[column.key]?.required }"
        :style="{ textAlign: column.align }"
      >
        <el-tooltip
          v-if="errorTip[column.key]"
          placement="top"
          :visible="true"
          effect="dark"
          :content="errorTip[column.key]"
          raw-content
        >
          <span style="color: #f00">{{ column.name }}</span>
        </el-tooltip>

        <template v-else> {{ column.name }} </template>

        <el-tooltip
          v-if="column.tips"
          effect="dark"
          :content="column.tips"
          raw-content
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </th>

      <th :class="ns.e('action')" v-if="!multipleFormProps.disabled">
        <span>操作</span>

        <el-button
          v-if="
            multipleFormProps.actionCreate &&
            multipleFormProps.mode !== 'custom'
          "
          style="margin-left: 8px"
          :icon="Plus"
          @click="handleCreate(rows.length)"
          link
          type="primary"
        >
          新增
        </el-button>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { multipleFormKey } from './token'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import ElTooltip from '@element-ultra/components/tooltip'
import ElIcon from '@element-ultra/components/icon'
import ElButton from '@element-ultra/components/button'

const {
  multipleFormProps,
  ns,
  columnRules,
  handleCreate,
  errorTip,
  rows,
  visibleColumns
} = inject(multipleFormKey)!
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>