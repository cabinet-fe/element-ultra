<template>
  <button
    type="button"
    class="btn-next"
    :disabled="internalDisabled"
    :aria-disabled="internalDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="nextText">{{ nextText }}</span>
    <el-icon v-else><arrow-right /></el-icon>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { ArrowRight } from 'icon-ultra'

const paginationNextProps = {
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1,
  },
  pageCount: {
    type: Number,
    default: 50,
  },
  nextText: {
    type: String,
    default: '',
  },
} as const

export default defineComponent({
  name: 'ElPaginationNext',

  components: {
    ElIcon,
    ArrowRight,
  },
  props: paginationNextProps,
  emits: ['click'],

  setup(props) {
    const internalDisabled = computed(
      () =>
        props.disabled ||
        props.currentPage === props.pageCount ||
        props.pageCount === 0
    )

    return {
      internalDisabled,
    }
  },
})
</script>
