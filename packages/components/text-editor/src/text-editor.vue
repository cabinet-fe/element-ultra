<template>
  <div
    :class="{
      [ns.b()]: true,
      [ns.m('focused')]: focused
    }"
  >
    <div :class="ns.e('toolbar')" ref="toolbarRef"></div>
    <div :class="ns.e('body')" ref="bodyRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import {
  createEditor,
  createToolbar,
  type Toolbar,
  type IDomEditor
} from '@wangeditor/editor'
import { textEditorProps } from './text-editor'
import { useEventWatch, useFormItem, useNamespace } from '@element-ultra/hooks'

defineOptions({
  name: 'ElTextEditor'
})

const props = defineProps(textEditorProps)

let emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: any): void
}>()

let focused = shallowRef(false)

const ns = useNamespace('text-editor')

const { formItem } = useFormItem()

const toolbarRef = shallowRef<HTMLDivElement>()
const bodyRef = shallowRef<HTMLDivElement>()

let editor: IDomEditor | null = null
let toolbar: Toolbar | null = null

const createTextEditor = () => {
  // 首先销毁之前创建的实例（如果实例已被创建）
  editor?.destroy()
  toolbar?.destroy()

  if (!toolbarRef.value || !bodyRef.value) return

  const { mode, placeholder, modelValue } = props

  editor = createEditor({
    selector: bodyRef.value,
    html: modelValue,

    config: {
      MENU_CONF: {
        async uploadImage(file: File, insert: any) {
          // 上传, 此处接入我们的分片上传
          // 上传完成后插入
          // insert(url, alt, href)
        }
      },

      onChange(editor) {
        emit('change', editor.getHtml())
      },

      onFocus() {
        focused.value = true
      },

      onBlur(editor) {
        focused.value = false
        // 通过blur事件来触发值的改变
        // 事件锁：一旦值是因事件触发而改变的，modelValue的监听器不会执行
        // 创建编辑器的操作，同时将对事件锁进行解锁
        setEvent(true)
        emit('update:modelValue', editor.getHtml())
      },
      placeholder
    },
    mode
  })

  toolbar = createToolbar({
    editor,
    selector: toolbarRef.value,
    mode
  })
}

const destroyTextEditor = () => {
  editor?.destroy()
  toolbar?.destroy()
}

/** 设置值 */
const setHtml = (html = '') => {
  editor?.setHtml(html)
}

// mode改变后重新创建编辑器
watch(() => props.mode, createTextEditor)

const [setEvent] = useEventWatch(() => props.modelValue, {
  onChangeByEvent: () => formItem?.validate(),
  onChangeNotByEvent: v => setHtml(v)
})

onMounted(() => {
  createTextEditor()
})

onUnmounted(() => {
  destroyTextEditor()
})
</script>
