import installer from './defaults'
export * from 'components'
export * from 'directives'
export * from 'hooks'
export * from 'tokens'
export { makeInstaller } from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer
