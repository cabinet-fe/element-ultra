import { createApp, h } from 'vue'
import { useConfig } from 'element-ultra'
import { router } from './src/router'
import App from './App.vue'
import '@element-ultra/theme-chalk/src/dark/css-vars.scss'

const [, setConfigStore] = useConfig()
setConfigStore({
  proTableDefaultSize: 60,
  proTableRequestMethod(options) {
    return new Promise(rs => {
      setTimeout(() => {
        let data = Array.from({ length: 1000 }).map((_, i) => ({
          child2: '张三说的有符合公司的的话是个' + i,
          money: ~~(Math.random() * 1000),
          name2: 1,
          id: i
        }))
        rs({
          data: data.filter(item => item.child2.includes(options.query.name)),
          total: data.length
          // statistics: {
          // money: 188888888
          // }
        })
      }, 300)
    })
  },

  tableSelectRequestMethod(option) {
    return new Promise((rs, rj) => {
      setTimeout(() => {
        const data = Array.from({ length: 20 }).map((_, i) => {
          return {
            code:
              'BM' +
              (10000 + (option.query.page - 1) * option.query.size + i + 1),
            summary: `摘要${i + 1}`,
            project: `项目${i + 1}`
          }
        })

        rs({
          total: 100,
          data
        })
      }, 400)
    })
  }
})

const app = createApp({
  render() {
    return h(App)
  }
})

app.config.globalProperties.c = console

app.use(router)

app.config.warnHandler = function (msg, vm, trace) {
  console.warn(`[警告]: ${msg}, 地址: ${trace}`)
}

app.mount('#play')
