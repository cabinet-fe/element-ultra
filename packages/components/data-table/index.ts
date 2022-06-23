import type { App } from 'vue'
import type { SFCWithInstall } from '@element-ultra/utils'
import DataTable from './src/data-table.vue'

(DataTable as SFCWithInstall<typeof DataTable>).install = (app: App) => {
  app.component(DataTable.name, DataTable)
}

export * from './src/data-table'

export default DataTable
export const ElDataTable = DataTable
