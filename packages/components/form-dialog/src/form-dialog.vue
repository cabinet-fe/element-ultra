<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    append-to-body
    :width="width"
    @update:model-value="emit('update:modelValue', $event)"
    @close="cancel"
  >
    <slot />

    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button
        :loading="loading"
        type="info"
        v-if="props.continue"
        @click="submitAndContinue"
      >
        提交并继续
      </el-button>
      <el-button :loading="loading" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import ElDialog from '@element-ultra/components/dialog'
import ElButton from '@element-ultra/components/button'
import { formDialogProps } from './form-dialog'
import { formInjectionKey } from '@element-ultra/tokens'
import { provide, shallowRef, watch } from 'vue'

defineOptions({
  name: 'ElFormDialog'
})

const props = defineProps(formDialogProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const forms = new Set<any>()
const multipleForms = new Set<any>()
const addForm = (form: any) => {
  forms.add(form)
}
const deleteForm = (form: any) => {
  forms.delete(form)
}

const addMultipleForm = (form: any) => {
  multipleForms.add(form)
}
const deleteMultipleForm = (form: any) => {
  multipleForms.delete(form)
}

provide(formInjectionKey, {
  addForm,
  deleteForm,
  addMultipleForm,
  deleteMultipleForm
})

watch(
  () => props.modelValue,
  visible => {
    !visible && resetForm()
  }
)

const cancel = () => {
  emit('update:modelValue', false)
}

const validateForm = async () => {
  for (const form of forms) {
    await form.validate()
  }
  for (const multipleForm of multipleForms) {
    await multipleForm.validate()
  }
}

const resetForm = async () => {
  forms.forEach(form => {
    form.resetFields()
  })
}

const loading = shallowRef(false)

/** 提交 */
const submit = async () => {
  await validateForm()

  loading.value = true

  if (!props.confirm) {
    loading.value = false
    return cancel()
  }

  const p = props.confirm()
  // 异步操作
  if (p instanceof Promise) {
    await p
      .then(result => {
        result !== false && cancel()
      })
      .finally(() => {
        loading.value = false
      })
  }
  // 同步操作
  else {
    loading.value = false
    p !== false && cancel()
  }
}

/** 提交并继续 */
const submitAndContinue = async () => {
  await validateForm()

  loading.value = true

  if (props.confirm) {
    const p = props.confirm()
    if (p instanceof Promise) {
      await p.finally(() => {
        loading.value = false
      })
    } else {
      loading.value = false
    }
  }
  resetForm()
}
</script>
