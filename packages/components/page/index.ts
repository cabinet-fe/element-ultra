import { withInstall } from 'utils'
import Page, { PageExposed } from './src/page'

export const ElPage = withInstall(Page)

export type PageInstance = InstanceType<typeof Page> & PageExposed

export default Page
