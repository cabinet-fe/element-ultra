import ElementUltra, { setConfigStore ,type ProTableRequestMethod } from 'element-ultra'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'

import VPApp, { globals, NotFound } from '../vitepress'
import { define } from '../utils/types'

// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

import type { Theme } from 'vitepress'

const request: ProTableRequestMethod = ({ api, query }) => {
  //  在控制台查看参数
  console.log('api: ', api)
  console.log('query', query)
  return new Promise((rs, rj) => {
    setTimeout(() => {
      const data = Array.from({ length: 20 }).map((_, i) =>  ({
        name: '张' + i,
        age: 10 + i
      }))
      rs({
        data,
        total: data.length, // 在分页时total必须返回
      })
    }, 600)
  })
}

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
  },
})


