import { resolve, join } from 'path'
import { buildOutput, epOutput, epPackage, pkgRoot, projRoot } from './utils/paths'
import { copy, rm } from 'fs-extra'

/** 复制文件到目标文件夹 */
export default async function copyFiles() {
  await Promise.all([
    // 类型文件
    copy(resolve(buildOutput, 'types'), epOutput, { recursive: true }),
    // element-ultra包package.json文件
    copy(resolve(epPackage), join(epOutput, 'package.json')),
    // README文件
    copy(`${projRoot}/README.md`, `${epOutput}/README.md`),
    // 全局组件类型文件
    copy(`${projRoot}/global.d.ts`, `${epOutput}/global.d.ts`)
  ])
}
