import path from 'path'
import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import { buildOutput, epRoot } from './utils/paths'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default async function genDTS() {
  console.log(path.resolve(epRoot, 'index.ts'))

  // 声明文件打包
  const declareBundle = await rollup({
    input: path.resolve(epRoot, 'index.ts'),

    plugins: [
      vue({
        isProduction: false
      }),
      vueJsx() as any,
      dts({
        respectExternal: true,

        compilerOptions: {
          // 2 node, 100 bundler
          moduleResolution: 100,
          isolatedModules: true
        }
      })
    ]
  })

  await declareBundle.write({
    dir:  path.resolve(buildOutput, 'types'),
    exports: 'auto'
  })
}