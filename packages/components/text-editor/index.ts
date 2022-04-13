import { withInstall } from '@element-ultra/utils'
import { defineAsyncComponent } from 'vue'
// import TextEditor from './src/text-editor.vue'

const TextEditor = defineAsyncComponent(() => import('./src/text-editor.vue'))

export const ElTextEditor = withInstall(TextEditor)

export default TextEditor

export * from './src/text-editor'
