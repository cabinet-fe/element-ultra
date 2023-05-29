import { appendFileSync } from 'fs-extra'
import { PKG } from '../utils/shared'
import type { Plugin } from 'rollup'

export function ElementUltraAlias(): Plugin {
  const sourceThemeChalk = `theme-chalk`
  const bundleThemeChalk = `${PKG}/theme-chalk`

  return {
    name: 'element-ultra-alias-plugin',
    resolveId(source) {
      appendFileSync('./aa.txt', source + '\n', 'utf-8')
      if (!source.startsWith(sourceThemeChalk)) return

      return {
        id: source.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      }
    }
  }
}
