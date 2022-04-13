import ElementUltra, { useConfig, type ProTableRequestMethod } from 'element-ultra'
import VPApp, { globals, NotFound } from '../vitepress'
import { define } from '../utils/types'

import 'uno.css'
import type { Theme } from 'vitepress'

const request: ProTableRequestMethod = ({ api, query }) => {
  //  在控制台查看参数
  console.log('api: ', api)
  console.log('query', query)
  return new Promise((rs, rj) => {
    setTimeout(() => {
      const data = Array.from({ length: 20 }).map((_, i) => ({
        name: '张' + i,
        age: 10 + i
      }))
      rs({
        data,
        total: data.length // 在分页时total必须返回
      })
    }, 600)
  })
}

const [, setConfigStore] = useConfig()
setConfigStore({
  proTableDefaultSize: 60,
  proTableRequestMethod: request
})

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementUltra)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  }
})
