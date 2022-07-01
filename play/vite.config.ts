import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementUltraResolver } from './resolver'
import Inspect from 'vite-plugin-inspect'
import glob from 'fast-glob'
import DefineOptions from 'unplugin-vue-define-options/vite'
import esbuild from 'rollup-plugin-esbuild'
import { epRoot, projRoot, epPackage } from '../gulpfile/utils/paths'

const esbuildPlugin = () => ({
  ...esbuild({
    target: 'chrome64',
    include: /\.vue$/,
    loaders: {
      '.vue': 'js',
    },
  }),
  enforce: 'post',
})

export default defineConfig(async () => {
  const dependencies = Object.keys(require(epPackage).dependencies)

  const optimizeDeps = (
    await glob(['dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
    })
  ).map((dep) => dep.replace(/\.js$/, ''))

  return {
    resolve: {
      alias: [
        {
          find: /^element-ultra$/,
          replacement: path.resolve(epRoot, 'index.ts'),
        }
      ],
    },
    server: {
      host: true,
      https: !!process.env.HTTPS,
    },
    plugins: [
      vue({
        reactivityTransform: true
      }),
      esbuildPlugin(),
      vueJsx(),
      DefineOptions(),
      Components({
        include: ["src/**", './App.vue'],
        resolvers: ElementUltraResolver({}),
        dts: false,
      }),
      Inspect(),
    ],

    optimizeDeps: {
      include: ['vue', '@vue/shared', ...dependencies, ...optimizeDeps],
    },
    esbuild: {
      target: 'chrome64',
    },
  }
})
