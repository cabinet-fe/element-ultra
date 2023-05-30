import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  h,
  withModifiers,
  unref
} from 'vue'
import { isClient } from '@vueuse/core'
import { rAF, cAF } from '@element-ultra/utils'

const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
} as const

import { SCROLLBAR_MIN_SIZE, HORIZONTAL, ScrollbarDirKey } from '../defaults'
import { virtualizedScrollbarProps } from '../props'
import { renderThumbStyle } from '../utils'

import type { CSSProperties } from 'vue'

const ScrollBar = defineComponent({
  name: 'ElVirtualScrollBar',
  props: virtualizedScrollbarProps,
  emits: ['scroll', 'start-move', 'stop-move'],
  setup(props, { emit }) {
    const GAP = 4 // top 2 + bottom 2 | left 2 + right 2

    // DOM refs
    const trackRef = ref<HTMLElement>()
    const thumbRef = ref<HTMLElement>()

    // local variables
    let frameHandle: null | number = null
    let onselectstartStore: null | typeof document.onselectstart = null

    // data
    const state = reactive({
      isDragging: false,
      traveled: 0
    })

    const bar = computed(() => BAR_MAP[props.layout])

    const trackSize = computed(() => props.clientSize! - GAP)

    const trackStyle = computed<CSSProperties>(() => ({
      position: 'absolute',
      width: HORIZONTAL === props.layout ? `${trackSize.value}px` : '6px',
      height: HORIZONTAL === props.layout ? '6px' : `${trackSize.value}px`,
      [ScrollbarDirKey[props.layout]]: '2px',
      right: '2px',
      bottom: '2px',
      borderRadius: '4px'
    }))

    const thumbSize = computed(() => {
      const ratio = props.ratio!
      const clientSize = props.clientSize!
      if (ratio >= 100) {
        return Number.POSITIVE_INFINITY
      }

      if (ratio >= 50) {
        return (ratio * clientSize) / 100
      }

      const SCROLLBAR_MAX_SIZE = clientSize / 3
      return Math.floor(
        Math.min(
          Math.max(ratio * clientSize, SCROLLBAR_MIN_SIZE),
          SCROLLBAR_MAX_SIZE
        )
      )
    })

    // const sizeRange = computed(() => props.size - thumbSize.value)

    const thumbStyle = computed<CSSProperties>(() => {
      if (!Number.isFinite(thumbSize.value)) {
        return {
          display: 'none'
        }
      }

      const thumb = `${thumbSize.value}px`

      const style: CSSProperties = renderThumbStyle(
        {
          bar: bar.value,
          size: thumb,
          move: state.traveled
        },
        props.layout
      )

      return style
    })

    const totalSteps = computed(() =>
      Math.floor(props.clientSize! - thumbSize.value - GAP)
    )

    const attachEvents = () => {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      const thumbEl = unref(thumbRef)

      if (!thumbEl) return

      onselectstartStore = document.onselectstart
      document.onselectstart = () => false

      thumbEl.addEventListener('touchmove', onMouseMove)
      thumbEl.addEventListener('touchend', onMouseUp)
    }

    const detachEvents = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      document.onselectstart = onselectstartStore
      onselectstartStore = null

      const thumbEl = unref(thumbRef)
      if (!thumbEl) return

      thumbEl.removeEventListener('touchmove', onMouseMove)
      thumbEl.removeEventListener('touchend', onMouseUp)
    }

    const onThumbMouseDown = (e: Event) => {
      e.stopImmediatePropagation()
      if (
        (e as KeyboardEvent).ctrlKey ||
        [1, 2].includes((e as MouseEvent).button)
      ) {
        return
      }

      state.isDragging = true
      state[bar.value.axis] =
        e.currentTarget![bar.value.offset] -
        (e[bar.value.client] -
          (e.currentTarget as HTMLElement).getBoundingClientRect()[
            bar.value.direction
          ])

      emit('start-move')
      attachEvents()
    }

    const onMouseUp = () => {
      state.isDragging = false
      state[bar.value.axis] = 0
      emit('stop-move')
      detachEvents()
    }

    const onMouseMove = (e: Event) => {
      const { isDragging } = state
      if (!isDragging) return
      if (!thumbRef.value || !trackRef.value) return

      const prevPage = state[bar.value.axis]
      if (!prevPage) return

      cAF(frameHandle!)
      // using the current track's offset top/left - the current pointer's clientY/clientX
      // to get the relative position of the pointer to the track.
      const offset =
        (trackRef.value.getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]) *
        -1

      // find where the thumb was clicked on.
      const thumbClickPosition = thumbRef.value[bar.value.offset] - prevPage
      /**
       *  +--------------+                                   +--------------+
       *  |              -  <--------- thumb.offsetTop       |              |
       *  |             |+|             <--+                 |              |
       *  |              -                 |                 |              |
       *  |   Content    |                 |                 |              |
       *  |              |                 |                 |              |
       *  |              |                 |                 |              |
       *  |              |                 |                 |              -
       *  |              |                 +-->              |             |+|
       *  |              |                                   |              -
       *  +--------------+                                   +--------------+
       */

      // using the current position - prev position to

      const distance = offset - thumbClickPosition
      // get how many steps in total.
      // gap of 2 on top, 2 on bottom, in total 4.
      // using totalSteps ÷ totalSize getting each step's size * distance to get the new
      // scroll offset to scrollTo
      frameHandle = rAF(() => {
        state.traveled = Math.max(
          0,
          Math.min(
            distance,
            totalSteps.value // 2 is the top value
          )
        )
        emit('scroll', distance, totalSteps.value)
      })
    }

    const clickTrackHandler = (e: MouseEvent) => {
      const offset = Math.abs(
        (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
          e[bar.value.client]
      )
      const thumbHalf = thumbRef.value![bar.value.offset] / 2
      const distance = offset - thumbHalf

      state.traveled = Math.max(0, Math.min(distance, totalSteps.value))
      emit('scroll', distance, totalSteps.value)
    }

    const onScrollbarTouchStart = (e: Event) => e.preventDefault()

    watch(
      () => props.scrollFrom,
      v => {
        if (state.isDragging) return
        /**
         *  this is simply mapping the current scrollbar offset
         *
         *  formula 1:
         *    v = scrollOffset / (estimatedTotalSize - clientSize)
         *    traveled = v * (clientSize - thumbSize - GAP) --> v * totalSteps
         *
         *  formula 2:
         *    traveled = (v * clientSize) / (clientSize / totalSteps) --> (v * clientSize) * (totalSteps / clientSize) --> v * totalSteps
         */
        state.traveled = Math.ceil(v! * totalSteps.value)
      }
    )

    onMounted(() => {
      if (!isClient) return
      trackRef.value?.addEventListener('touchstart', onScrollbarTouchStart, {
        passive: true
      })
      thumbRef.value?.addEventListener('touchstart', onThumbMouseDown, {
        passive: true
      })
    })

    onBeforeUnmount(() => {
      trackRef.value?.removeEventListener('touchstart', onScrollbarTouchStart)
      thumbRef.value?.removeEventListener('touchstart', onThumbMouseDown)
      detachEvents()
    })

    return () => {
      return h(
        'div',
        {
          role: 'presentation',
          ref: trackRef,
          class: 'el-virtual-scrollbar',
          style: trackStyle.value,
          onMousedown: withModifiers(clickTrackHandler, ['stop', 'prevent'])
        },
        h(
          'div',
          {
            ref: thumbRef,
            class: 'el-scrollbar__thumb',
            style: thumbStyle.value,
            onMousedown: onThumbMouseDown
          },
          []
        )
      )
    }
  }
})

export default ScrollBar
