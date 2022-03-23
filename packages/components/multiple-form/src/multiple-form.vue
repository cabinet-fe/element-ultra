<template>
  <div :class="ns.b()">
    <el-button @click="add">增加</el-button>

    <table :class="ns.e('table')">
      <thead>
        <tr>
          <th v-for="column of columns">{{ column.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item of internalData">
          <template v-if="item._isInEdit === true">
            <td v-for="node of getChildren({ row: item })">
              <component :is="node" />
            </td>

            <td>
              <el-button type="primary" text @click="item._isInEdit = false"
                >保存</el-button
              >
              <el-button type="primary" text @click="item._isInEdit = false">
                取消</el-button
              >
            </td>
          </template>

          <template v-else>
            <td v-for="(node, index) of getChildren({ row: item })">
              {{ item[columns[index]?.key] }}
            </td>

            <td>
              <el-button type="primary" text @click="item._isInEdit = true"
                >编辑</el-button
              >
              <el-button type="primary" text>删除</el-button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { computed, reactive, ref, shallowRef, useSlots, watch } from 'vue'
import { multipleFormProps } from './multiple-form'
import ElButton from '@element-ultra/components/button'
defineOptions({
  name: 'ElMultipleForm',
})

const ns = useNamespace('multiple-form')

const props = defineProps(multipleFormProps)
const slots = useSlots()

const internalData = ref<any[]>([])

watch(
  () => props.data,
  () => {
    internalData.value = props.data.map((item) => {
      if (item._isInEdit === undefined) {
        item._isInEdit = false
      }

      return item
    })
  },
  {
    immediate: true,
  }
)

function getChildren(scope: any) {
  return slots.default?.(scope) || []
}

const add = () => {
  let template = props.columns.reduce((acc, cur) => {
    acc[cur.key] = ''
    return acc
  }, {} as Record<string, any>)

  internalData.value.push({
    ...(template as any),
    _isInEdit: true,
  })
}
</script>
