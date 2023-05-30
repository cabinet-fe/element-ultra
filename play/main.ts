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
        let data = Array.from({ length: 1000}).map((_, i) => ({
          name: '张三说的有符合公司的的话是个' + i,
          money: ~~(Math.random() * 1000),
          name2: 1,
          // children: [
          //   {
          //     name: '你好',
          //     money: 10086,
          //     id: `${i}-1`,
          //     children: [
          //       { name: '你好' + i + '-1-1', money: 666, id: i + '-1-1' },
          //       { name: '你好' + i + '-1-2', money: 666, id: i + '-1-2' },
          //       { name: '你好' + i + '-1-3', money: 666, id: i + '-1-3' }
          //     ]
          //   },
          //   { name: '你好', money: 10001, id: `${i}-2` }
          // ],
          id: i
        }))
        rs({
          data,
          total: 100,
          // statistics: {
            // money: 188888888
          // }
        })
      }, 100)
    })
  },

  tableSelectRequestMethod(option) {
    return new Promise((rs, rj) => {
      setTimeout(() => {
        const data = Array.from({ length: 20 }).map((_, i) => {

          return {
            code: 'BM' + (10000 + (option.query.page - 1) * option.query.size + i + 1),
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
