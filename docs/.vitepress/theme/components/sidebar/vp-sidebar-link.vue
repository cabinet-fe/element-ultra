<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { isActive } from '../../utils'
import type { Link } from '../../types'
import { BASE_PATH } from '../../../utils/shared'
import { computed } from '@vue/reactivity'
import { inject, onMounted, shallowRef } from 'vue'

const props = defineProps<{
  item: Link
}>()

defineEmits(['close'])
const route = useRoute()
let linkRef = shallowRef<HTMLElement>()
const setActiveLink = inject<any>('setActiveLink')!
const active = computed(() => {
  let ret = isActive(route, props.item.link.replace(BASE_PATH, '/'))
  ret && setActiveLink(linkRef.value)
  return ret
})
</script>

<template>
  <a
    :class="{ link: true, active }"
    ref="linkRef"
    :href="item.link"
    @click="$emit('close')"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<style scoped lang="scss">
.link {
  display: block;
  padding: 0.625rem 2rem 0.625rem 1.5rem;
  line-height: 1.5;
  font-size: 0.9rem;
  margin: 0 8px;
  border-radius: 8px;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  color: var(--brand-color);
  transition: color 0.25s;
}

.link.active {
  background-color: rgba(64, 158, 255, 0.1);
  .link-text {
    font-weight: 600;
    color: var(--brand-color);
    transition: color 0.25s;
  }
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-light);
  transition: color 0.5s;
}
</style>
