import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import UnoCSS from 'unocss/vite'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
      replacement: path.resolve(projRoot, 'packages/element-ultra/index.ts'),
    },
    {
      find: /^element-ultra\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$1`,
    }
  )
}

export default async () => {
  const dependencies = Object.keys(require(epPackage).dependencies)

  const optimizeDeps = [
    'vue',
    '@vue/shared',
    'markdown-it',
    'clipboard-copy',
    'axios',
    'nprogress',
    ...dependencies,
  ]
  optimizeDeps.push(
    ...(
      await glob(['dayjs/plugin/*.js'], {
        cwd: path.resolve(projRoot, 'node_modules'),
        onlyFiles: true,
      })
    ).map((file) => file.replace(/\.js$/, ''))
  )

  return defineConfig({
    server: {
      host: true,
      fs: {
        allow: [projRoot],
      },
    },
    resolve: {
      alias,
    },
    plugins: [
      vueJsx(),
      DefineOptions(),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver(),
        ],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
      }),
      UnoCSS(),
      Inspect(),
    ],
    optimizeDeps: {
      include: optimizeDeps,
    },
  })
}
