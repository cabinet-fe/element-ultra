import { withInstall } from '@element-ultra/utils'
import DataTable from './src/data-table.vue'

export * from './src/data-table'

export default DataTable
export const ElDataTable = withInstall(DataTable)
export type DataTableInstance = InstanceType<typeof DataTable>