import { resolve } from 'path'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = require(resolve(
    __dirname,
    '../../packages/element-ultra/package.json'
  ))

  return (id: string) => {
    const packages: string[] = Object.keys(peerDependencies)

    if (!options.full) {
      packages.push('theme-chalk')
      // dependencies
      packages.push('@vue', ...Object.keys(dependencies))
    }

    let ret = [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`))

    return ret
  }
}
