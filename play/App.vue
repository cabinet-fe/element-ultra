<template>
  <div class="play-container" :cols="['200px', '1fr']" gap="0">
    <div class="play-aside">
      <el-select
        style="width: 100%"
        v-model="size"
        :options="[
          { value: 'large', label: '大' },
          { value: 'default', label: '中' },
          { value: 'small', label: '小' }
        ]"
        @change="handleSizeChange"
      />

      <el-switch v-model="theme" @change="toggleDark" />
      <ul>
        <li v-for="component of components">
          <router-link class="link" :to="component.path">
            {{ component.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <main class="play-main">
      <router-view v-if="!reloading" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useConfig } from 'element-ultra'
import { nextTick, onUnmounted, shallowRef } from 'vue'
const list = import.meta.glob('./src/*.vue')

let theme = shallowRef(false)
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}

let reloading = shallowRef(false)

const keydown = (e: KeyboardEvent) => {
  if (e.key === 'F5') {
    e.preventDefault()
    reloading.value = true
    nextTick(() => {
      reloading.value = false
    })
  }
}
document.addEventListener('keydown', keydown)

onUnmounted(() => {
  document.removeEventListener('keydown', keydown)
})

const [, setConfigStore] = useConfig()

const components = Object.keys(list).map(key => {
  let path = key.replace(/^\.\/src(.*)\.vue$/, '$1')
  let name = path.slice(1)
  return {
    name,
    path
  }
})

let size = shallowRef('default' as const)

const handleSizeChange = (size: 'large' | 'default' | 'small') => {
  setConfigStore({
    size
  })
}
</script>

<style lang="scss" scoped>
.play-container {
  height: 100%;
  display: flex;

}

.play-aside {
  height: 100%;
  border-right: 1px solid #ccc;
  padding: 10px;
  width: 200px;

  ul {
    margin: 0;
    padding: 0;
    height: calc(100% - 80px);
    overflow: auto;
  }

  li {
    list-style: none;
  }
}

.play-main {
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  width: calc(100% - 200px);
  background-color: #f2f2f2;
  padding: 8px;
}

.link {
  padding: 6px 4px;
  display: inline-block;
}
</style>
