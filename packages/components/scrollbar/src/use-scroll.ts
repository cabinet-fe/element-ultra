import type { ShallowRef } from 'vue'
import type { BarState, BarX, BarY } from './scrollbar'

interface Options {
  wrapper: ShallowRef<HTMLElement | undefined>
}

export default function (options: Options) {
  const { wrapper } = options

  /**
   * 更新滚动条样式
   * 根据以下方程得出滚动条的样式, 其中滚动条的偏移量由transform来渲染
   * 滚动条偏移量 / 容器高度 = 容器滚动偏移量 / 容器滚动内容高度
   * eg: translateY / wrapper.offsetHeight = wrapper.offsetHeight / wrapper.scrollHeight
   */
  const updateBarStyle = (cb: (barState: BarState) => void) => {
    const dom = wrapper.value
    if (!dom) return

    const {
      offsetWidth,
      scrollWidth,
      scrollLeft,

      offsetHeight,
      scrollHeight,
      scrollTop
    } = dom

    const visible = {
      barX: offsetWidth !== scrollWidth,
      barY: offsetHeight !== scrollHeight
    }

    const barX: BarX = {
      width: 0,
      left: 0
    }

    const barY: BarY = {
      height: 0,
      top: 0
    }

    const minSize = 20

    // 当滚动条可见时更新
    if (visible.barX) {
      barX.width = offsetWidth ** 2 / scrollWidth
      if (barX.width < minSize) {
        barX.width = minSize
      }
      barX.left  = (offsetWidth - barX.width) * scrollLeft / (scrollWidth - offsetWidth)
    }

    if (visible.barY) {
      barY.height = offsetHeight ** 2 / scrollHeight
      if (barY.height < minSize) {
        barY.height = minSize
      }
      barY.top  = (offsetHeight - barY.height) * scrollTop / (scrollHeight - offsetHeight)
    }

    cb({
      barX,
      barY,
      visible,
      wrapState: {
        offsetWidth,
        scrollWidth,
        scrollLeft,

        offsetHeight,
        scrollHeight,
        scrollTop
      }
    })
  }

  return updateBarStyle
}
