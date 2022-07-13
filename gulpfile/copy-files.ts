import { resolve, join } from 'path'
import { buildOutput, epOutput, epPackage, projRoot } from './utils/paths'
import { copy } from 'fs-extra'

/** 复制文件到目标文件夹 */
export default async function copyFiles() {
  console.log(resolve(buildOutput, 'types'), epOutput)
  await Promise.all([
    // 类型文件
    copy(resolve(buildOutput, 'types/packages'), epOutput, { recursive: true }),
    // element-ultra包package.json文件
    copy(resolve(epPackage), join(epOutput, 'package.json')),
    // README文件
    copy(`${projRoot}/README.md`, `${epOutput}/README.md`),
    // 全局组件类型文件
    copy(`${projRoot}/global.d.ts`, `${epOutput}/global.d.ts`)
  ])
}
