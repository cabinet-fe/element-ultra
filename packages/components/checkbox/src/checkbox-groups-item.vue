<template>
  <el-checkbox
    :indeterminate="indeterminate"
    @change="handleUpdateModelValue"
    :checked="allChecked"
  >
    {{ group.label }}
  </el-checkbox>

  <div :class="ns.e('items')">
    <el-checkbox
      @change="handleItemChange($event, item.value)"
      v-for="item of group.items"
      :checked="checkedSet.has(item.value)"
      :value="item.value"
    >
      {{ item.label ?? item.value }}
    </el-checkbox>
  </div>
</template>

<script lang="ts" setup>
import ElCheckbox from './checkbox.vue'
import { computed, inject } from 'vue'
import type { CheckboxGroupsProps } from './checkbox-groups'
import { checkboxGroupsKey } from './token'

const props = defineProps<{
  group: CheckboxGroupsProps['groups'][number]
}>()

const { checkedSet, ns, emitChange } = inject(checkboxGroupsKey)!

let allChecked = computed(() => {
  return props.group.items.every(item => checkedSet.value.has(item.value))
})

const indeterminate = computed(() => {
  return !allChecked.value && props.group.items.some(item => checkedSet.value.has(item.value))
})

const handleUpdateModelValue = (checked: boolean) => {
  const { items } = props.group
  if (checked) {
    items.forEach(item => checkedSet.value.add(item.value))
  } else {
    items.forEach(item => checkedSet.value.delete(item.value))
  }
}

const handleItemChange = (checked: boolean, value: string) => {
  checkedSet.value[checked ? 'add' : 'delete'](value)
  emitChange(checked, value)
}
</script>
