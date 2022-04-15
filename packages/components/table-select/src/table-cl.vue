<template>
  <table :class="ns.b()" border="1">
    <thead>
      <tr>
        <th v-if="checkable"></th>
        <th v-for="item in columns">{{ item.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData">
        <td v-if="checkable && !multiple">
          <el-radio v-model="radio" :value="row.id">{{}}</el-radio>
        </td>
        <td v-else-if="checkable && multiple">
          <el-checkbox
            :value="row.id"
            :checked="checkbox.has(row.id)"
            @update:model-value="$event ? checkbox.add(row.id) : checkbox.delete(row.id)"
            >{{}}</el-checkbox
          >
        </td>
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
  {{ checkbox }}
</template>

<script lang="ts" setup>
import { onMounted, watch, inject, nextTick, ref } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableClProps } from './table-cl'
import { ElCheckbox, ElRadio } from '@element-ultra/components'

const props = defineProps(tableClProps)

const { data, checkable } = props

const ns = useNamespace('table-cl')

let multiple = inject('multiple')

let radio = $ref<string | number | boolean | undefined>(null)

let checkbox = $ref(new Set())

let selected = $ref<Record<string, any>>(null)

let tableData = $ref<any>(null)

const stateInit = () => {

}

const getValue = () => {
  if (multiple) {
    return [...checkbox].map((id: any) => {
      return tableData.find((item: any) => item.id === id)
    })
  } else {
    return data.find((item: any) => {
      return item.id === radio
    })
  }
}

const setValue = (data: Record<string, any>) => {
  console.log('setvalue')
  if(multiple) {
    data.forEach((id: string | number | undefined) => checkbox.add(id))
  }
}

const clear = () => {
  checkbox.clear()
}

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

defineExpose({
  setValue,
  getValue,
  clear
})
</script>
