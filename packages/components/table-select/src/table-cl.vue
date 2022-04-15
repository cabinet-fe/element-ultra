<template>
  <table :class="ns.b()" border="1">
    <thead>
      <tr>
        <th></th>
        <th v-for="item in columns">{{ item.name }}</th>
      </tr>
    </thead>
    <tbody>
      <div v-if="!tableData?.length">暂无数据~</div>
      <tr v-for="row in tableData">
        <td><el-radio v-model="index" :value="row.id" @change="handleSelect">{{}}</el-radio></td>
        <td v-for="item in columns">{{ row[item.key] }}</td>
      </tr>
    </tbody>
    <!-- <tfoot>
      <tr>
        <td>Sum</td>
        <td>$180</td>
      </tr>
    </tfoot> -->
  </table>
</template>

<script lang="ts" setup>
import { onMounted, watch, watchEffect } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableClProps } from './table-cl'
import { ElCheckbox, ElRadio } from '@element-ultra/components'

const props = defineProps(tableClProps)

const { modelValue, data } = props

const ns = useNamespace('table-cl')

const emits = defineEmits<{
  (e: 'update:modelValue', data: Record<string, any>[]): void
}>()

let index = $ref<string | number | boolean | undefined>(null)

let selected = $ref<Record<string, any>>(null)

let tableData = $ref<any>(null)

const handleSelect = (val: string | number | boolean) => {
  selected = data.find((item: any) => {
    return item.id === val
  })
}

const stateInit = () => {
  // selected = modelValue
}

watch(
  () => selected,
  (cur, pre) => {
    emits('update:modelValue', [cur])
  }
)

watch(
  () => props.data,
  (cur, pre) => {
    tableData = cur
  },
  {
    immediate: true
  }
)

onMounted(() => {
  stateInit()
})
</script>
