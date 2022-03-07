<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<template>
  <table :class="ns.e('header')">
    <!-- 多行表头需要将表头的配置二维化, 并且能够关联父列 -->
    <!-- <tr v-for="headerRow of headers">
      <th
        v-for="header of headerRow"
        :colspan="header.children?.length"
        :class="ns.e('header-cell')"
        :key="header.key"
      >
        {{ header.name }}
      </th>
    </tr> -->
    <tr>
      <th colspan="2">姓名</th>

      <th rowspan="2">年龄</th>
      <th rowspan="2">日期</th>
    </tr>

    <tr>
      <th>姓</th>
      <th>名</th>

    </tr>
  </table>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { inject } from 'vue'
import { dataTableToken } from './token'

const ns = useNamespace('data-table')

const { headers } = inject(dataTableToken)!
</script>
