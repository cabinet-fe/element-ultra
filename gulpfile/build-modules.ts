import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { epOutput, epRoot, pkgRoot } from './utils/paths'
import { generateExternal } from './utils/rollup'
import { ElementUltraAlias } from './plugins/alias'

/** 构建packages下的模块 */
export default async function buildModules() {
  const excludeRE = /(test|mock|gulpfile|dist)/

  const input = (
    await glob('**/*.{js,ts,vue}', {
      absolute: true,
      cwd: pkgRoot,
      onlyFiles: true,
      ignore: ['**/node_modules']
    })
  ).filter(item => !excludeRE.test(item))

  const bundle = await rollup({
    input,
    plugins: [
      ElementUltraAlias(),
      DefineOptions(),
      vue({
        isProduction: false
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    external: await generateExternal({ full: false }),
    treeshake: false
  })

  await bundle.write({
    format: 'esm',
    dir: epOutput,
    preserveModules: true,
    preserveModulesRoot: epRoot,
    sourcemap: true,
    entryFileNames: `[name].mjs`
  })
}
