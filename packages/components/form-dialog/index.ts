import { withInstall } from '@element-ultra/utils'
import FormDialog from './src/form-dialog.vue'

export const ElFormDialog = withInstall(FormDialog)

export default FormDialog

export * from './src/form-dialog'

export { default as useFormDialog } from './src/use-form-dialog'
