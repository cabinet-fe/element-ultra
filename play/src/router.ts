import { createRouter, createWebHistory } from 'vue-router'

const apps = import.meta.glob('./*.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: Object.keys(apps).map((key) => {
    return {
      path: key.replace(/^\.(.*)\.vue$/, '$1'),
      component: apps[key],
    }
  }),
})
