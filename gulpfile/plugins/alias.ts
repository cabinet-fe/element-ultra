import { PKG, PREFIX} from '../utils/shared'
import type { Plugin } from 'rollup'

export function ElementUltraAlias(): Plugin {

  const StyleDir = `${PREFIX}/theme-chalk`

  return {
    name: 'element-ultra-alias-plugin',
    resolveId(id, importer, options) {
      if (!id.startsWith(PREFIX)) return

      if (id.startsWith(StyleDir)) {
        return {
          id: id.replaceAll(StyleDir, `${PKG}/theme-chalk`),
          external: 'absolute',
        }
      }

      return this.resolve(id, importer, { skipSelf: true, ...options })
    },
  }
}
