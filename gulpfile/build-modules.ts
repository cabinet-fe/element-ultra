import glob from 'fast-glob'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementUltraAlias } from './plugins/alias'
import css from 'rollup-plugin-css-only'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { epOutput, epRoot } from './utils/paths'
import { generateExternal } from './utils/rollup'
import { resolve } from 'path'

/** 构建packages下的模块 */
export default async function buildModules() {
  const excludeRE = /(test|mock|gulpfile|dist)/

  const input = (await glob('**/*.{js,ts,vue}', {
      absolute: true,
      cwd: resolve(__dirname, '../packages'),
      ignore: ['**/node_modules'],
      onlyFiles: true
    }))
    .filter((item) => !excludeRE.test(item))

  const bundle = await rollup({
    input,
    plugins: [
      ElementUltraAlias(),
      css(),
      DefineOptions(),
      vue({
        isProduction: true,
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  })

  await bundle.write({
    format: 'esm',
    dir: epOutput,
    exports: undefined,
    preserveModules: true,
    preserveModulesRoot: epRoot,
    sourcemap: true,
    entryFileNames: `[name].mjs`,
  })
}
