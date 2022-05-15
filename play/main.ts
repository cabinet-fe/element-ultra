import { createApp, defineComponent, h } from 'vue'
import { useConfig } from 'element-ultra'
import { router } from './src/router'
import App from  './App.vue'

const MyComponent = defineComponent({
  render() {
    return h('div', ['哈哈'])
  }
})

const [, setConfigStore] = useConfig()
setConfigStore({
  proTableDefaultSize: 60,
  proTableRequestMethod: () => {
    let data = [
      {
        name: '张三',
        id: 1,
        age: 20,

        // children: [
        //   { name: '李四', id: 2, age: 21 }
        // ]
      },
      {
        name: '李四',
        id: 2,
        age: 28
      }
    ]
    return Promise.resolve({
      data,
      total: data.length,
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
