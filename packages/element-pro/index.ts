import installer from './defaults'
export * from '@element-pro/components'
export * from '@element-pro/directives'
export * from '@element-pro/hooks'
export * from '@element-pro/tokens'
export { makeInstaller } from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer
