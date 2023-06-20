<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  provide,
  shallowRef,
  watch
} from 'vue'
import { gridProps, type GridProps, type ResponsiveCols } from './grid'
import type { CSSProperties } from 'vue'
import { useConfig, useNamespace } from '@element-ultra/hooks'
import { gridInjectionKey } from './token'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'ElGrid',

  props: gridProps,

  emits: {
    resize: (rect: DOMRectReadOnly) => true
  },

  setup(props, { attrs, slots, emit }) {
    const ns = useNamespace('grid')

    let containerWidth = shallowRef(0)

    // 响应式列数
    let responsiveCols = shallowRef<number>(1)

    const isResponsiveCols = (v: any): v is ResponsiveCols => {
      return Object.prototype.toString.call(v) === '[object Object]'
    }

    const point = computed(() => {
      return getCurrentPoint(containerWidth.value)
    })

    provide(gridInjectionKey, {
      point
    })

    const gridTemplateColumns = computed(() => {
      const { cols } = props

      if (isResponsiveCols(cols)) {
        responsiveCols.value = getPointCols(point.value, cols)
        return `repeat(${responsiveCols.value}, 1fr)`
      }

      if (typeof cols === 'number') {
        return `repeat(${cols}, 1fr)`
      }
      if (typeof cols === 'string') {
        return cols
      }
      return cols.join(' ')
    })

    const style = computed(() => {
      const { rows } = props

      const gridTemplateRows = typeof rows === 'string' ? rows : rows?.join(' ')
      const result: CSSProperties = {
        gridTemplateColumns: gridTemplateColumns.value,
        gridTemplateRows,
        gap: props.gap
          .split(',')
          .map(s => `${s}px`)
          .join(' ')
      }
      return result
    })

    let gridRef: HTMLElement | null = null // shallowRef<>()

    const [config] = useConfig()

    /**
     * 获取容器断点
     * @param w 容器宽度
     */
    const getCurrentPoint = (w: number) => {
      const { xs, s, m, l, xl } = config.breakpoint
      if (w < xs) return 'xs'
      if (w < s) return 's'
      if (w < m) return 'm'
      if (w < l) return 'l'
      if (w < xl) return 'xl'
      return 'xxl'
    }

    /**
     * 获取断点对应的列
     * @param point 当前所属的断点
     * @param cols
     */
    const getPointCols = (
      point: ReturnType<typeof getCurrentPoint>,
      cols: ResponsiveCols
    ) => {
      let queue = ['xs', 's', 'm', 'l', 'xl', 'xxl']

      let ret = cols[point]
      let pointIndex = queue.indexOf(point)
      while (ret === undefined && pointIndex <= 5) {
        pointIndex++
        ret = cols[queue[pointIndex]]
      }
      if (ret === undefined) {
        ret = cols.cols
      }

      return ret
    }

    let observer: ResizeObserver | undefined = undefined

    const observe = (cols: GridProps['cols']) => {
      observer?.disconnect()
      if (!gridRef || !isResponsiveCols(cols)) return

      observer = new ResizeObserver(
        debounce(
          (entries: ResizeObserverEntry[]) => {
            const [entry] = entries
            if (!entry) return

            const { width } = entry.contentRect
            containerWidth.value = width
            emit('resize', entry.contentRect)
          },
          0,
          { leading: true }
        )
      )

      observer.observe(gridRef)

      return observer
    }

    watch(
      () => props.cols,
      cols => {
        if (!isResponsiveCols(cols)) {
          gridRef && observer?.unobserve(gridRef)
          return observer?.disconnect()
        }
        observe(cols)
      }
    )

    onMounted(() => {
      observe(props.cols)
    })
    onBeforeUnmount(() => observer?.disconnect())

    return () => {
      const { tag } = props
      return h(
        tag,
        {
          ...attrs,
          class: [ns.b()],
          style: style.value,
          ref: ref => (gridRef = ref as HTMLElement)
        },
        slots.default?.() || []
      )
    }
  }
})
</script>
