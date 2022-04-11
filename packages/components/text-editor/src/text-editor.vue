<template>
  <div :class="ns.b()">
    <div :class="ns.e('toolbar')" ref="toolbarRef"></div>
    <div :class="ns.e('body')" ref="bodyRef" id="editor-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, watch } from 'vue'
import {
  createEditor,
  createToolbar,
  SlateTransforms,
  type Toolbar,
  type IDomEditor,
  
} from '@wangeditor/editor'
import { textEditorProps } from './text-editor'
import { useFormItem, useNamespace } from '@element-ultra/hooks'

const props = defineProps(textEditorProps)

const ns = useNamespace('text-editor')

let emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: any): void
}>()

const { formItem } = useFormItem()

const toolbarRef = shallowRef<HTMLDivElement>()
const bodyRef = shallowRef<HTMLDivElement>()

let editor: IDomEditor | null = null
let toolbar: Toolbar | null = null
let valueChangesByEvent = false

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
      onBlur(editor) {
        // 通过blur事件来触发值的改变

        // 事件锁：一旦值是因事件触发而改变的，modelValue的监听器不会执行
        // 创建编辑器的操作，同时将对事件锁进行解锁
        valueChangesByEvent = true
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

/** 设置值 */
const setHtml = (html = '') => {
  if (!editor) return
  // 选中所有 -> 删除选中的片段 -> 设置节点属性 -> 插入html片段
  editor.select([])
  editor.deleteFragment()
  // highest针对最高层级的节点
  SlateTransforms.setNodes(editor, {}, { mode: 'highest' })
  editor.dangerouslyInsertHtml(html)
}

// mode改变后重新创建编辑器
watch(() => props.mode, createTextEditor)

watch(
  () => props.modelValue,
  (v) => {
    // 事件触发的值改变发起校验并解锁
    if (valueChangesByEvent) {
      formItem?.validate()
      valueChangesByEvent = false // 解锁
      return
    }
    // 非事件触发， 比如通过获取的数据触发的
    setHtml(v)
  }
)

onMounted(() => {
  createTextEditor()
})
</script>
