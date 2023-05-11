import { withInstall } from 'utils'
import { defineAsyncComponent } from 'vue'

const TextEditor = defineAsyncComponent(() => import('./src/text-editor.vue'))
TextEditor.name = 'ElTextEditor'

export const ElTextEditor = withInstall(TextEditor)

export default TextEditor

export * from './src/text-editor'
