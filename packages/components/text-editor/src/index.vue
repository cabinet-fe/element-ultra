<template>
  <div class="box">
     <div id="toolbar-container" style="width: 100%"></div>
     <div id="editor-container" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { createEditor, createToolbar } from '@wangeditor/editor'
import type { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import '../style/index.ts'

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor: IDomEditor) => {
  // 当编辑器选区、内容变化时，即触发
  console.log('content', editor.children)
  console.log('html', editor.getHtml())
}

const init = () => {
  // 创建编辑器
  const editor = createEditor({
    selector: '#editor-container',
    config: editorConfig,
    mode: 'default',
  })

  // 创建工具栏
  const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    mode: 'default',
  })
}

onMounted(() => {
  init()
})
</script>

