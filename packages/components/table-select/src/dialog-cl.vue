<template>
  <el-dialog v-model="visible">
    <TableCl v-model="selected" :data="data" :columns="columns" />
    <template #footer>
      <el-button-group>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-button-group>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElButtonGroup, ElButton } from '@element-ultra/components'
import { useNamespace } from '@element-ultra/hooks'
import { dialogClProps } from './dialog-cl'
import TableCl from './table-cl.vue'

let visible = $ref<boolean>(false)

let selected = $ref<any>([])

const props = defineProps(dialogClProps)

const { data, columns } = props

const ns = useNamespace('dialog-cl')

const emits = defineEmits<{
  (
    e: 'change',
    data: Record<string, any>[]
  ): void
}>()

const open = () => {
  visible = true
}

const close = () => {
  visible = false
}

const handleCancel = () => {
  close()
}

const submit = () => {
  emits('change', selected)
  close()
}

defineExpose({
  open
})
</script>
