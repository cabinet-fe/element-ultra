<template>
  <div class="play-container">
    <ul class="play-aside">
      <li v-for="component of components">
        <router-link class="link" :to="component.path">
          {{ component.name }}
        </router-link>
      </li>
    </ul>

    <main class="play-main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
const list = import.meta.glob('./src/*.vue')
const components = Object.keys(list).map((key) => {
  let path = key.replace(/^\.\/src(.*)\.vue$/, '$1')
  console.log(key)
  let name = path.slice(1)
  return {
    name,
    path,
  }
})
</script>

<style lang="scss" scoped>
.play-container {
  display: flex;
  height: 100%;
  /* justify-content: flex-start; */
}

.play-aside {
  margin: 0;
  padding: 10px;
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid #ccc;

  li  {
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
