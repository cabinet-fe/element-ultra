import { PKG, PREFIX } from '../utils/shared'
import type { Plugin } from 'rollup'

export function ElementUltraAlias(): Plugin {
  const sourceThemeChalk = `${PREFIX}/theme-chalk`
  const bundleThemeChalk = `${PKG}/theme-chalk`

  return {
    name: 'element-ultra-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return

      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
