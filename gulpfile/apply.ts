import { epOutput, viteCache, icTarget } from './utils/paths'
import { copy } from 'fs-extra'
import del from 'del'

/** 复制文件到目标文件夹 */
export default async function copyFiles() {
  await del(`${icTarget}/**`, {
    force: true
  })
  await copy(epOutput, icTarget, { recursive: true })
  await del(`${viteCache}/**`, {
    force: true
  })
}
