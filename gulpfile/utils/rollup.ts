import type { OutputOptions, RollupBuild } from 'rollup'
import { resolve } from 'path'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = require(resolve(
    __dirname,
    '../../packages/element-ultra/package.json'
  ))

  return (id: string) => {
    const packages: string[] = Object.keys(peerDependencies)

    if (!options.full) {
      packages.push('element-ultra/theme-chalk')
      // dependencies
      packages.push('@vue', ...Object.keys(dependencies))
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
