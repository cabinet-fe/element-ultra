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
</template>

<script lang="ts" setup>
import { watch, inject } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableClProps } from './table-cl'
import { ElCheckbox, ElRadio } from '@element-ultra/components'

const props = defineProps(tableClProps)

const { data, checkable } = props

const ns = useNamespace('table-cl')

let multiple = inject('multiple')

let radio = $ref<string | number | boolean | undefined>(null)

let checkbox = $ref(new Set())

let store = $ref({
  radio: null,
  checkbox: new Set()
})

let tableData = $ref<any>(null)

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
  if (multiple) {
    checkbox.clear()
    store.checkbox.clear()
    data?.forEach((item: Record<string, any>) => {
      checkbox.add(item.id)
      store.checkbox.add(item.id)
    })
  }else {
    radio = data[0].id
    store.radio = data[0].id
  }
}

const clear = () => {
  if (multiple) {
    checkbox.clear()
    store.checkbox.forEach((item: string) => {
      checkbox.add(item)
    })
  }else {
    radio = store.radio
  }
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

watch(
  () => props.value,
  (cur, pre) => {
    cur ? setValue(cur) : void 0
  },
  {
    immediate: true
  }
)

defineExpose({
  getValue,
  clear
})
</script>
