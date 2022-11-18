import { utoa } from '../utils'

const MAIN_FILE_NAME = 'App.vue'

export const usePlayGround = (source: string) => {
  const code = decodeURIComponent(source)
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = utoa(JSON.stringify(originCode))
  // TODO 替换play ground
  const link = `https://element-pro.run/#${encoded}`
  return {
    encoded,
    link,
  }
}
