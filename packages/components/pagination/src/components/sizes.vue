<template>
  <span :class="ns.e('sizes')">
    <el-select
      :model-value="innerPageSize"
      :disabled="disabled"
      :popper-class="popperClass"
      :size="size"
      :options="pageOptions"
      @change="handleChange"
    >

    </el-select>
  </span>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { isEqual } from 'lodash-unified'
import { ElSelect } from '@element-pro/components/select'
import { useLocale, useNamespace } from '@element-pro/hooks'
import { buildProps, definePropType, mutable } from '@element-pro/utils'
import { usePagination } from '../usePagination'

const paginationSizesProps = buildProps({
  pageSize: {
    type: Number,
    required: true,
  },
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100] as const),
  },
  popperClass: {
    type: String,
    default: '',
  },
  disabled: Boolean,
  size: {
    type: String,
    values: ['large', 'default' , 'small'],
    default: 'default',
  },
} as const)

export default defineComponent({
  name: 'ElPaginationSizes',

  components: {
    ElSelect
  },

  props: paginationSizesProps,
  emits: ['page-size-change'],

  setup(props, { emit }) {
    const { t } = useLocale()
    const ns = useNamespace('pagination')
    const pagination = usePagination()
    const innerPageSize = ref<number |  null>(props.pageSize)

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
      (newVal) => {
        innerPageSize.value = newVal
      }
    )

    function handleChange(val: number) {
      if (val !== innerPageSize.value) {
        innerPageSize.value = val
        pagination.handleSizeChange?.(Number(val))
      }
    }

    const pageOptions = props.pageSizes.map((size) => ({
      label: size + t('el.pagination.pagesize'),
      value: size,
    }))

    return {
      ns,
      pageOptions,
      innerPageSize,

      t,
      handleChange,
    }
  },
})
</script>
