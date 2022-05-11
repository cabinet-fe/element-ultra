<template>
  <table :class="ns.b()">
    <thead :class="ns.e('header')">
      <tr :class="ns.e('header-row')">
        <th v-if="checkable">
          <el-radio v-if="!multiple"></el-radio>
          <el-checkbox
            v-else
            v-model="allCheck"
            @change="handleAllCheck"
            :indeterminate="isIndeterminate"
          ></el-checkbox>
        </th>
        <th v-if="showIndex" :class="ns.e('auto')">序号</th>
        <th
          v-for="item in columns"
          :class="{ [ns.e('auto')]: !item.width }"
          :style="{ width: `${item.width}px` }"
        >
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody :class="ns.e('body')">
      <div :class="ns.e('wrapper')">
        <tr
          v-for="(row, index) in tableData"
          :class="{ [ns.e('row')]: true, [ns.e('row-stripe')]: index % 2 === 1 && stripe }"
        >
          <td v-if="checkable && !multiple" :class="ns.e('radio')">
            <el-radio v-model="radio.val" :value="row.id">{{}}</el-radio>
          </td>
          <td v-else-if="checkable && multiple" :class="ns.e('checkbox')">
            <el-checkbox
              :value="row.id"
              :checked="checkbox.has(row.id)"
              @update:model-value="$event ? checkbox.add(row.id) : checkbox.delete(row.id)"
              >{{}}</el-checkbox
            >
          </td>
          <td v-if="showIndex" :class="ns.e('auto')">{{ index + 1 }}</td>
          <td
            v-for="item in columns"
            :class="{ [ns.e('auto')]: !item.width }"
            :style="{ width: `${item.width}px` }"
          >
            {{ item.render ? item.render(row, index, row[item.key]) : row[item.key] }}
            <div v-if="item.key === 'action'"><slot name="action"></slot></div>
          </td>
        </tr>
      </div>
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
import { watch, inject, computed, ref, reactive } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectDisplayProps } from './table-select-display'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElRadio } from '@element-ultra/components/radio'
import { multipleKey, showIndexKey, stripeKey, valueKeyKey } from './token'

const props = defineProps(tableSelectDisplayProps)

const { data, checkable } = props

const ns = useNamespace('table-select-display')

const multiple = inject(multipleKey)
const showIndex = inject(showIndexKey)
const stripe = inject(stripeKey)
const valueKey = inject(valueKeyKey)

let radio = ref({ val: '' })

let checkbox = ref(new Set())

let store = reactive({
  radio: '',
  checkbox: new Set()
})

let tableData = ref<any>(null)

let isIndeterminate = ref<boolean>(false)

let allCheck = ref<boolean>(false)

const handleAllCheck = (val: boolean) => {
  if (val) {
    tableData.value.forEach((item: Record<string, any>) => {
      checkbox.value.add(item[valueKey])
    })
  } else {
    checkbox.value.clear()
  }
}

const getValue = () => {
  if (multiple) {
    return [...checkbox.value].map((valueKey: any) => {
      return tableData.value.find((item: any) => item[valueKey] === valueKey)
    })
  } else {
    return data.find((item: any) => {
      return item.id === radio.value.val
    })
  }
}

const setValue = (data: Record<string, any>) => {
  if (multiple) {
    checkbox.value.clear()
    store.checkbox.clear()
    data?.forEach((item: Record<string, any>) => {
      checkbox.value.add(item[valueKey])
      store.checkbox.add(item[valueKey])
    })
  } else {
    radio.value.val = data[0][valueKey]
    store.radio = data[0][valueKey]
  }
}

const clear = () => {
  if (multiple) {
    checkbox.value.clear()
    store.checkbox.forEach((item: any) => {
      checkbox.value.add(item)
    })
  } else {
    radio.value.val = store.radio || ''
  }
}

watch(
  () => props.data,
  (cur, pre) => {
    tableData.value = cur
  },
  {
    immediate: true
  }
)

watch(
  () => props.value,
  (cur, pre) => {
    if (cur && cur.length) setValue(cur)
  },
  {
    immediate: true
  }
)

let checkboxsize = computed(() => {
  return checkbox.value.size
})

watch(
  () => checkboxsize.value,
  (cur, pre) => {
    cur && cur !== tableData.value.length
      ? (isIndeterminate.value = true)
      : (isIndeterminate.value = false)
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
