<template>
  <div class="box" style="width: 900px">
    <div id="toolbar-container" style="width: 100%"></div>
    <div id="editor-container" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createEditor, createToolbar } from "@wangeditor/editor";
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from "@wangeditor/editor";

const prop = defineProps<{
  model: String;
  disable: Boolean | any;
}>();

let emit = defineEmits<{
  (e: "update:modelValue", value: string): void;

  (e: "update:onChange" , value: any): void
}>();
const editorConfig: Partial<IEditorConfig> = {};
editorConfig.placeholder = "请输入内容";
/** 是否禁用 */
editorConfig.readOnly = prop.disable;
editorConfig.onChange = (editor: IDomEditor) => {
  // 当编辑器选区、内容变化时，即触发
  // console.log("content", editor.children);
  // console.log("html", editor.getHtml());
  emit("update:modelValue", editor.getHtml());
  emit("update:onChange", editor.getHtml())
};

const init = () => {
  // 创建编辑器
  const editor = createEditor({
    selector: "#editor-container",
    config: editorConfig,
    mode: "default",
  });

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [...editor.getAllMenuKeys()],
  };

  // 创建工具栏
  createToolbar({
    editor,
    selector: "#toolbar-container",
    mode: "default",
    config: toolbarConfig,
  });
  // console.log(editor.getAllMenuKeys(), 1243);
};

onMounted(() => {
  init();
});
</script>
