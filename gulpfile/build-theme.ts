import { run } from "./utils/process"

/** 构建样式 */
export default async function buildTheme() {
  return run('pnpm run -C packages/theme-chalk build')
}
