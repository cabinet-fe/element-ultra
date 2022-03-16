<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />

    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="info" @click="submitAndContinue">提交并继续</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import ElDialog from '@element-ultra/components/dialog'
import ElButton from '@element-ultra/components/button'
import { formDialogProps } from './form-dialog'
import { formDialogContextKey, type FormContext } from '@element-ultra/tokens'
import { provide } from 'vue'
defineOptions({
  name: 'ElFormDialog',
})

const props = defineProps(formDialogProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

emit('update:modelValue', false)

// TODO这里form的类型最终需要还原
// TODO 要把一些代码抽成useFormDialog
const forms = new Set<any>()

const addForm = (form: any) => {
  forms.add(form)
}
const deleteForm = (form: any) => {
  forms.delete(form)
}

provide(formDialogContextKey, {
  addForm,
  deleteForm,
})

const cancel = () => {
  emit('update:modelValue', false)
}

const validateForm = async () => {
  for (const form of forms) {
    await form.validate()
  }
}

const resetForm = async () => {
  for (const form of forms) {
    form.resetFields()
  }
}

const submit = async () => {
  await validateForm()

  if (props.confirm) {
    await props.confirm()
  }
  resetForm()
  cancel()
}

const submitAndContinue = async () => {
  await validateForm()
  if (props.confirm) {
    await props.confirm()
  }
  resetForm()
}
</script>
