import { BASE_PATH } from '../utils/shared'

const addPrefix = (arr: any[]) => {
  let base = BASE_PATH.slice(0, -1)
  return arr.map(item => {
    return {
      ...item,
      link: base + item.link,
      activeMatch: base + item.activeMatch
    }
  })
}

export const nav =addPrefix([
  { text: '指南', link: '/guide/design', activeMatch: '/guide/' },
  {
    text: '组件',
    link: '/component/button',
    activeMatch: '/component/',
  },
  {
    text: '资源',
    link: '/resource/index',
    activeMatch: '/resource/',
  },
])
