import { createApp, h } from 'vue'
import { useConfig } from 'element-ultra'
import { router } from './src/router'
import App from './App.vue'
import '@element-ultra/theme-chalk/src/dark/css-vars.scss'

const [, setConfigStore] = useConfig()
setConfigStore({
  proTableDefaultSize: 60,

  proTableRequestMethod: () => {
    return new Promise(rs => {
      setTimeout(() => {
        let data = Array.from({ length: 100 }).map((_, i) => ({
          name: '张三说的有符合公司的的话是个' + i,
          money: 100 + i,
          id: i
        }))
        rs({
          data,
          total: 100,
          statistics: {
            money: 188888888
          }
        })
      }, 500)
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
