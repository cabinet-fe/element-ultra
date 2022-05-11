import del from 'del'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'

/**
 * 清除构建目录
 * @returns
 */
export default async function clean() {
  let bundleDir = resolve(cwd(), 'dist')
  await del(`${bundleDir}/**`)

  if (existsSync(bundleDir)) return

  mkdirSync(bundleDir)
}
