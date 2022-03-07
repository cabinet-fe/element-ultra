import installer from './defaults'
export * from '@element-ultra/components'
export * from '@element-ultra/directives'
export * from '@element-ultra/hooks'
export * from '@element-ultra/tokens'
export { makeInstaller } from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer
