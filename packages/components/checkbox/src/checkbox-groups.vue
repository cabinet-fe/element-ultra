<template>
  <div :class="ns.b()">
    <GroupsItem v-for="group of groups" :group="group" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { provide, ref, watch } from 'vue'
import { checkboxGroupsProps, checkboxGroupsEmits } from './checkbox-groups'
import GroupsItem from './checkbox-groups-item.vue'
import { checkboxGroupsKey } from './token'

defineOptions({
  name: 'ElCheckboxGroups'
})

const props = defineProps(checkboxGroupsProps)
const emit = defineEmits(checkboxGroupsEmits)

const ns = useNamespace('checkbox-groups')
let checkedSet = ref(new Set<string | number>())
// TODO watchExcludeEvent()
let changedByEvent = false

const emitChange = (checked: boolean, value: string) => {
  changedByEvent = true
  emit('update:modelValue', Array.from(checkedSet.value))
  emit('checked-change', checked, value)
}

watch(
  () => props.modelValue,
  value => {
    if (changedByEvent) {
      changedByEvent = false
      return
    }
    checkedSet.value = new Set(value)
  },
  { immediate: true }
)

provide(checkboxGroupsKey, {
  checkedSet,
  ns,
  emitChange
})
</script>
