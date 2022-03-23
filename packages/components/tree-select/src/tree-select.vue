<template>
  <div :class="ns.b()">
    <el-tooltip
      class="box-item"
      effect="light"
      placement="bottom-start"
      :trigger="trigger"
      :effect="effect"
    >
      <template #content>
        <el-tree :data="data" :props="{children: 'children', label: 'label'}" @node-click="handleNodeClick" style="width: 200px;" />
      </template>
      <el-input v-model="input" placeholder="tree select..." style="width: 200px;"></el-input>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { useSlots, ref, watch } from 'vue'
import { treeSelectProps, treeSelectEmits } from './tree-select'
import { ElTooltip, ElInput, ElTree } from '../../index'
defineOptions({
  name: 'ElTreeSelect',
})

const props = defineProps(treeSelectProps)

const emits = defineEmits(treeSelectEmits)

let { data, trigger, effect, modelValue } = props

const ns = useNamespace('tree-select')

const handleNodeClick = (data: any) => {
  input.value = data.label
}

let input = ref(modelValue)

watch(
  () => input.value,
  (cur, pre) => {
    console.log(cur)
    emits('input', cur || '' )
  }
)

</script>

<style lang="scss" scoped>
.el-tree-select {
  background: #fff;
  height: 600px;
}
</style>