import path from 'path'
import fs from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import { bold } from 'chalk'

import { buildOutput, epRoot, pkgRoot, projRoot } from './utils/paths'

import type { SourceFile } from 'ts-morph'

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export default async function genDefinitions() {
  // 当前项目
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir: path.resolve(buildOutput, 'types'),
      baseUrl: projRoot,
      paths: {
        '@element-ultra/*': ['packages/*']
      },
      skipLibCheck: true,
      preserveSymlinks: true,
      noImplicitAny: false
    },

    tsConfigFilePath: path.resolve(projRoot, 'tsconfig.web.json'),
    skipAddingFilesFromTsConfig: true
  })

  // 获取TS文件
  const sourceFiles = await getSourceFiles(project)

  // 输出诊断信息
  // const diagnostics = project.getPreEmitDiagnostics()

  // if (diagnostics.length > 0) {
  //   console.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
  //   throw new Error('Failed to generate dts.')
  // }

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const entryRE = /dist\/types\/packages\/index\.d\.ts$/

  const tasks = sourceFiles.map(async sourceFile => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
    // yellow(`Generating definition for file: ${bold(relativePath)}`)

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      console.log(`Emit no file: ${bold(relativePath)}`)
      // errorAndExit(new Error(`Emit no file: ${bold(relativePath)}`))
    }

    const tasks = emitFiles.map(async outputFile => {
      const filepath = outputFile.getFilePath()

      await fs.mkdir(path.dirname(filepath), {
        recursive: true
      })

      let content = outputFile.getText()
      content = content.replaceAll(
        `@element-ultra/theme-chalk`,
        'element-ultra/theme-chalk'
      )
      content = content.replaceAll(`@element-ultra/`, `element-ultra/`)

      // if (entryRE.test(filepath)) {
      //   content = content.replaceAll(`element-ultra/`, './')
      // }

      await fs.writeFile(filepath, content, 'utf8')

      // green(`Definition for file: ${bold(relativePath)} generated`)
    })

    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}

async function getSourceFiles(project: Project) {
  const excludeRE = /(test|mock|gulpfile|dist|node_modules)/

  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'))

  //  packages下除了element-ultra目录中的文件
  // '**/*.{vue,ts,js}'
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = (
    await glob([globSourceFile, '!element-ultra/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  ).filter(path => !excludeRE.test(path))

  //  packages中的element-ultra目录中的文件
  const epPaths = (
    await glob(globSourceFile, {
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

          if (script && script.content) {
            content += script.content
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }
          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
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
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      )
    })
  ])

  return sourceFiles
}
