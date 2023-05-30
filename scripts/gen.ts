import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const components = process.argv.slice(2)

/**
 * 驼峰化
 * @param str aa-bb-cc类似的字符串
 * @param big 是否转化成大驼峰, 默认false
 * @returns
 */
const camelCase = (str: string, big = false) => {
  let base = str.replace(/-([\w])/g, (s, s2) => {
    return s2.toUpperCase()
  })
  return big ? base[0].toUpperCase() + base.slice(1) : base
}

const componentsDir = resolve(__dirname, '../packages/components')
const themeDir = resolve(__dirname, '../packages/theme-chalk/src')

const createComponent = (name: string) => {
  const componentDir = resolve(componentsDir, name)

  let exist = existsSync(componentDir)
  if (exist) return

  const camelCaseName = camelCase(name)
  const bigCamelCaseName = camelCase(name, true)

  // 入口文件写入
  mkdirSync(componentDir)
  const componentEntryFileLines = [
    `import El${bigCamelCaseName} from './src/${name}.vue'`,
    '',
    `export * from './src/${name}'`,
    '',
    `export { El${bigCamelCaseName} }`,
    `export default El${bigCamelCaseName}`,
  ]
  writeFileSync(resolve(componentDir, 'index.ts'), componentEntryFileLines.join('\n'))

  // 创建组件
  const componentSrcDir = resolve(componentDir, 'src')
  mkdirSync(componentSrcDir)
  const componentSourceFileLines = [
    '<template>',
    '',
    '</template>',
    "<script lang='ts' setup>",
    `import { ${camelCaseName}Props, ${camelCaseName}Emits } from './${name}'`,
    '',
    'defineOptions({',
    `  name: 'El${bigCamelCaseName}'`,
    '})',
    `const props = defineProps(${camelCaseName}Props)`,
    `const emit = defineEmits(${camelCaseName}Emits)`,
    '</script>'
  ]
  writeFileSync(resolve(componentSrcDir, `${name}.vue`), componentSourceFileLines.join('\n'))

  const componentExportsFileLines = [
    "import type { ExtractPropTypes } from 'vue'",
    "import type { EmitFn } from '@element-ultra/utils'",
    '',
    `export const ${camelCaseName}Props = {`,
    '',
    '} as const',
    `export const ${camelCaseName}Emits = {`,
    '',
    '}',
    `export type ${bigCamelCaseName}Props = ExtractPropTypes<typeof ${camelCaseName}Props>`,
    '',
    `export type ${bigCamelCaseName}Emits = EmitFn<typeof ${camelCaseName}Emits>`
  ]
  writeFileSync(resolve(componentSrcDir, `${name}.ts`), componentExportsFileLines.join('\n'))

  // 创建样式
  const scssFileLines = ["@use 'mixins/mixins' as *;", '', `@include b(${name}) {`, '', '}']
  writeFileSync(resolve(themeDir, `${name}.scss`), scssFileLines.join('\n'))

  const styleDir = resolve(componentDir, 'style')
  mkdirSync(styleDir)

  const styleIndexFileLines = [
    "import '@element-ultra/components/base/style'",
    `import '@element-ultra/theme-chalk/src/${name}.scss'`
  ]
  writeFileSync(resolve(styleDir, 'index.ts'), styleIndexFileLines.join('\n'))

  const styleCssFileLines = [
    "import '@element-ultra/components/base/style/css'",
    `import '@element-ultra/theme-chalk/${name}.css'`
  ]
  writeFileSync(resolve(styleDir, 'css.ts'), styleCssFileLines.join('\n'))
}


components.forEach(createComponent)