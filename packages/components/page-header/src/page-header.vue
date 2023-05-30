<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')" @click="handleClick">
      <div v-if="icon || $slots.icon" :class="ns.e('icon')">
        <slot name="icon">
          <el-icon v-if="icon"><component :is="icon" /></el-icon>
        </slot>
      </div>
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div :class="ns.e('content')">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'

import { useNamespace } from '@element-ultra/hooks'
import { pageHeaderEmits, pageHeaderProps } from './page-header'

export default defineComponent({
  name: 'ElPageHeader',

  components: {
    ElIcon,
  },

  props: pageHeaderProps,
  emits: pageHeaderEmits,

  setup(_, { emit }) {
    const ns = useNamespace('page-header')

    function handleClick() {
      emit('back')
    }

    return {
      handleClick,
      ns,
    }
  },
})
</script>
