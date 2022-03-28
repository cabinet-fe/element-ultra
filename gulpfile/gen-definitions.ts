import path from 'path'
import fs from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import { bold } from 'chalk'

import { errorAndExit, green, yellow } from './utils/log'
import { buildOutput, epOutput, epRoot, pkgRoot, projRoot } from './utils/paths'

import type { SourceFile } from 'ts-morph'

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export default async function genDefinitions() {
  const excludeRE = /(test|mock|gulpfile|dist|node_modules)/

  // 当前项目
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir: path.resolve(buildOutput, 'types'),
      baseUrl: projRoot,
      paths: {
        '@element-ultra/*': ['packages/*']
      },
      preserveSymlinks: true
    },

    tsConfigFilePath: path.resolve(projRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  //  packages下除了element-ultra目录中的文件
  const filePaths = (
    await glob(['**/*.{js,ts,vue}', '!element-ultra/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  ).filter(path => !excludeRE.test(path))

  //  packages中的element-ultra目录中的文件
  const epPaths = (
    await glob('**/*.{js,ts,vue}', {
      cwd: epRoot,
      onlyFiles: true
    })
  ).filter(path => !excludeRE.test(path))

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts') isTS = true
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
            if (scriptSetup.lang === 'ts') isTS = true
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async file => {
      const content = await fs.readFile(path.resolve(epRoot, file), 'utf-8')
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content))
    })
  ])

  // 输出诊断信息
  // const diagnostics = project.getPreEmitDiagnostics()
  // console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async sourceFile => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
    // yellow(`Generating definition for file: ${bold(relativePath)}`)

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      errorAndExit(new Error(`Emit no file: ${bold(relativePath)}`))
    }

    const tasks = emitFiles.map(async outputFile => {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filepath), {
        recursive: true
      })

      let content = outputFile.getText()
      content = content.replaceAll(`@element-ultra/theme-chalk`, 'element-ultra/theme-chalk')
      content = content.replaceAll(`@element-ultra/`, `element-ultra/`)

      await fs.writeFile(filepath, content, 'utf8')

      // green(`Definition for file: ${bold(relativePath)} generated`)
    })

    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}
