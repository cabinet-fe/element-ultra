<template>
  <span :class="ns.e('sizes')">
    <el-select
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      :size="size"
      :options="pageOptions"
      @change="handleChange"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, watch, ref, type PropType } from 'vue'
import { isEqual } from 'lodash-unified'
import { ElSelect } from '@element-ultra/components/select'
import { useNamespace } from '@element-ultra/hooks'
import { usePagination } from '../usePagination'
import type { ComponentSize } from '@element-ultra/shared'

const paginationSizesProps = {
  pageSize: {
    type: Number,
    required: true
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  popperClass: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  }
} as const

export default defineComponent({
  name: 'ElPaginationSizes',

  components: {
    ElSelect
  },

  props: paginationSizesProps,
  emits: ['page-size-change'],

  setup(props, { emit }) {
    const ns = useNamespace('pagination')
    const pagination = usePagination()
    const innerPageSize = ref<number | null>(props.pageSize)

    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return
        if (Array.isArray(newVal)) {
          const pageSize =
            newVal.indexOf(props.pageSize) > -1
              ? props.pageSize
              : props.pageSizes[0]
          emit('page-size-change', pageSize)
        }
      }
    )

    watch(
      () => props.pageSize,
      newVal => {
        innerPageSize.value = newVal
      }
    )

    function handleChange(val: number) {
      if (val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
      }
    }

    const pageOptions = props.pageSizes.map(size => ({
      label: size + '条/页',
      value: size
    }))

    return {
      ns,
      pageOptions,
      innerPageSize,
      handleChange
    }
  }
})
</script>
