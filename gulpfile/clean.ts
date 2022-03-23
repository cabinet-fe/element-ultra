import rimraf from 'rimraf'

/**
 * 清除构建目录
 * @returns
 */
export default async function clean() {
  return new Promise((rs) => {
    rimraf('dist/**/*', (err) => {
      if (!err) return rs('success')
    })
  })
}
