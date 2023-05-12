import ElPage, { PageExposed } from './src/page'

export type PageInstance = InstanceType<typeof ElPage> & PageExposed

export { ElPage }

export default ElPage
