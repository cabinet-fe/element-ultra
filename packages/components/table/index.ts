import { withInstall } from '@element-ultra/utils'
import Table from './src/table.vue'

export const ElTable = withInstall(Table)

export type { TableProps, TableColumn } from './src/table'

export default ElTable
