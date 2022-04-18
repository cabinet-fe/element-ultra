<template>
  <el-dialog v-model="visible">
    <TableCl :data="tableData ? tableData : data" :columns="columns" :value="value" checkable ref="tableRef" />
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
import { shallowRef, watch } from 'vue'
import { dialogClProps } from './dialog-cl'
import TableCl from './table-cl.vue'
import { Http } from 'fe-dk'

let visible = $ref<boolean>(false)

const props = defineProps(dialogClProps)

const { data, columns, api } = props

const ns = useNamespace('dialog-cl')

const tableRef = shallowRef()

const emits = defineEmits<{
  (e: 'change', data: Record<string, any>[]): void
}>()

const open = () => {
  visible = true
}

const close = () => {
  visible = false
}

const handleCancel = () => {
  tableRef.value.clear()
  close()
}

const submit = () => {
  const data = tableRef.value.getValue()
  emits('change', data)
  close()
}

const http = new Http({
  timeout: 18000
})

let tableData = $ref(null)

const fetchData = (api: string) => {
  http.get(api).then((res) => {
    const { code, data } = res
    if (code !== 200) return
    tableData = data
  })
}

watch(
  () => props.api,
  (cur, pre) => {
    cur ? fetchData(cur) : void 0
  },
  {
    immediate: true
  }
)

defineExpose({
  open
})
</script>
