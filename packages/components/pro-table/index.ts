import { withInstall } from '@element-ultra/utils'

import ProTable from './src/pro-table.vue'

export * from './src/pro-table'

export * from './src/token'

export const ElProTable = withInstall(ProTable)

export default ElProTable

export type ProTableInstance = InstanceType<typeof ProTable>