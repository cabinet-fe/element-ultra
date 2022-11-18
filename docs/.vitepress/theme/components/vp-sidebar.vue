<script lang="ts" setup>
import { provide, shallowRef, watch } from 'vue'
import { useSidebar } from '../composables/sidebar'
import VPSidebarLink from './sidebar/vp-sidebar-link.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { sidebars, hasSidebar } = useSidebar()

let activeLink = shallowRef<HTMLElement>()

const setActiveLink = (el: HTMLElement) => {
  activeLink.value = el
}

const scrollIntoView = () => {
  activeLink.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}

watch(activeLink, () => {
  scrollIntoView()
})

provide('setActiveLink', setActiveLink)
</script>

<template>
  <aside v-if="hasSidebar" :class="{ sidebar: true, open }">
    <slot name="top" />
    <div class="sidebar-groups">
      <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">
          {{ item.text }}
        </p>
        <VPSidebarLink
          v-for="(child, childKey) in item.children"
          :key="childKey"
          :item="child"
          @close="emit('close')"
        />
      </section>
    </div>
    <slot name="bottom" />
  </aside>
</template>
