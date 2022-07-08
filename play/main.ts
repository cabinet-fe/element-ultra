import { createApp, defineComponent, h } from 'vue'
import { useConfig } from 'element-ultra'
import { router } from './src/router'
import App from  './App.vue'
import '@element-ultra/theme-chalk/src/dark/css-vars.scss'

const MyComponent = defineComponent({
  render() {
    return h('div', ['哈哈13'])
  }
})

const [, setConfigStore] = useConfig()
setConfigStore({
  proTableDefaultSize: 60,
  proTableRequestMethod: () => {
    let data = Array.from({ length: 100 }).map((_, i) => ({
      name: '张三说的有符合公司的的话是个' + i,
      id: i
    }))
    return Promise.resolve({
      data,
      total: 100,
    })
  },
  pageExtraComponents: [
    MyComponent
  ]
})

const app = createApp({
  render() {
    return h(App)
  },
})

app.config.globalProperties.c = console

app.use(router)

app.config.warnHandler = function (msg, vm, trace) {
  console.warn(`[警告]: ${msg}, 地址: ${trace}`)
}

app.mount('#play')
