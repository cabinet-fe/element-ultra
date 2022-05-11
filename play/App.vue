<template>
  <el-grid class="play-container" :cols="['200px', '1fr']" gap="0">
    <div class="play-aside">
      <ul>
        <li v-for="component of components">
          <router-link class="link" :to="component.path">
            {{ component.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <main class="play-main">
      <router-view />
    </main>
  </el-grid>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue'

const list = import.meta.glob('./src/*.vue')

const components = Object.keys(list).map(key => {
  let path = key.replace(/^\.\/src(.*)\.vue$/, '$1')
  let name = path.slice(1)
  return {
    name,
    path
  }
})

</script>

<style lang="scss" scoped>
.play-container {
  height: 100%;
}

.play-aside {
  height: 100%;
  border-right: 1px solid #ccc;
  padding: 10px;

  ul {
    margin: 0;
    padding: 0;
    height: calc(100% - 32px);
  }

  li {
    list-style: none;
  }
}

.play-main {
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  background-color: #f2f2f2;
}

.link {
  padding: 6px 4px;
  display: inline-block;
}
</style>
