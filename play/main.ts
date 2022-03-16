import { createApp } from 'vue'
import '@element-ultra/theme-chalk/src/index.scss'
import { setConfigStore } from 'element-ultra'

setConfigStore({
  proTableDefaultSize: 60,
  proTableRequestMethod: () => {
    let data = [
      {
        name: '张三',
        age: 20,
      },
    ]
    return {
      data,
      total: data.length
    }
  },
})

async function start () {
  const apps = import.meta.glob('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'app'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  const App = (await file()).default
  const app = createApp(App)

  app.mount('#play')
}

start()
