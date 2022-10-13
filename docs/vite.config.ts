import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { epPackage } from '../gulpfile/utils/paths'
import { projRoot } from './.vitepress/utils/paths'
import type { Alias } from 'vite'

const alias: Alias[] = []
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^element-ultra$/,
      replacement: path.resolve(projRoot, 'packages/element-ultra/index.ts')
    },
    {
      find: /^element-ultra\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$1`
    }
  )
}

export default defineConfig(async () => {
  const dependencies = Object.keys(require(epPackage).dependencies)

  const optimizeDeps = [
    'vue',
    '@vue/shared',
    'markdown-it',
    'clipboard-copy',
    'axios',
    'nprogress',
    ...dependencies
  ]
  optimizeDeps.push(
    ...(
      await glob(['dayjs/plugin/*.js'], {
        cwd: path.resolve(projRoot, 'node_modules'),
        onlyFiles: true
      })
    ).map(file => file.replace(/\.js$/, ''))
  )

  return {
    server: {
      host: true,
      fs: {
        allow: [projRoot]
      }
    },
    resolve: {
      alias
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx()
        }
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['.vitepress/vitepress/components'],

        allowOverrides: true,
        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver()
        ],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true
      }),
      UnoCSS(),
      Inspect()
    ],
    optimizeDeps: {
      include: optimizeDeps
    }
  }
})
