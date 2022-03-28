<template>
  <div class="box">
     <div id="toolbar-container" style="width: 100%"></div>
     <div id="editor-container" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { createEditor, createToolbar,  } from '@wangeditor/editor'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const editorConfig: Partial<IEditorConfig> = {}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor: IDomEditor) => {
  // 当编辑器选区、内容变化时，即触发
  console.log('content', editor.children)
  console.log('html', editor.getHtml())
}

const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
        // 菜单 key
        'headerSelect',

        // 分割线
        '|',

        // 菜单 key
        'bold', 'italic',

        // 菜单组，包含多个菜单
        {
            key: 'group-more-style', // 必填，要以 group 开头
            title: '更多样式', // 必填
            iconSvg: '<svg>....</svg>', // 可选
            menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
        }
    ]
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
    mode: 'default'
  })

  console.log(editor.getAllMenuKeys(),1243)
}

onMounted(() => {
  init()
})
</script>

