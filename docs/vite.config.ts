import path from 'path'
import { defineConfig } from 'vite'
import glob from 'fast-glob'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { epPackage } from '../gulpfile/utils/paths'
import { projRoot } from './.vitepress/utils/paths'
import fs from 'fs'


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

      // Inspect()
      {
        name: 'md-transform',
        enforce: 'pre',
        async transform(code, id) {
          const targetDir = 'component/'
          const modulePath = id.split(targetDir)[1]?.replace(/\.md/, '')

          const hasDemos = fs.existsSync(
            path.resolve(__dirname, `./examples/${modulePath}`)
          )

          // 只对utils文件夹里面的
          if (!id.endsWith('.md') || !id.includes(targetDir) || !hasDemos)
            return

          const script = `<script setup>
            const demos = import.meta.globEager('../examples/${modulePath}/*.vue')
          </script>\n`

          // 返回一个相对该md文件的相对路径的
          return `${script} ${code}`
        }
      }
    ],
    optimizeDeps: {
      include: optimizeDeps
    }
  }
})
