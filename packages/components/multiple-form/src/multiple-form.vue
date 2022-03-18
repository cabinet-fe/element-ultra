<template>
  <div :class="ns.b()">
    <table>
      <thead>
        <tr>
          <th v-for="column of columns">{{ column.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of realData">
          <template v-if="item._isInEdit">
            <td v-for="node of getChildren({ row: item })">
              <component :is="node" />
            </td>

            <td>
              <el-button text @click="item._isInEdit = false">保存</el-button>
              <el-button text @click="item._isInEdit = false"> 取消</el-button>
            </td>
          </template>

          <template v-else>
            <td v-for="(node, index) of getChildren({ row: item })">

              {{ item[columns[index]?.key] }}
            </td>

            <td>
              <el-button text @click="item._isInEdit = true">编辑</el-button>
              <el-button text>删除</el-button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { useSlots } from 'vue'
import { multipleFormProps } from './multiple-form'
defineOptions({
  name: 'ElMultipleForm',
})

const props = defineProps(multipleFormProps)
const slots = useSlots()

const realData = $computed(() => {
  return props.data.map((item) => {
    item._isInEdit = true

    return item
  })
})

function getChildren(scope: any) {
  return slots.default?.(scope) || []
}

const ns = useNamespace('multiple-form')
</script>
