import { defineAsyncComponent } from 'vue'

const ElTextEditor = defineAsyncComponent(() => import('./src/text-editor.vue'))
ElTextEditor.name = 'ElTextEditor'

export * from './src/text-editor'

export { ElTextEditor }

export default ElTextEditor
