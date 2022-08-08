import { watch, WatchOptions, WatchSource } from 'vue'

/**
 * 监听一个响应式值的改变并根据是否是由事件改变执行不同的回调
 * @param source 监听的响应值
 * @param callback 值改变时的回调
 * @returns
 */
export const useEventWatch = <T extends any = any, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  callback?: {
    /** 值改变时的回调 */
    onChange?: (v: T) => void
    /** 通过事件触发的回调 */
    onChangeByEvent?: (v: T) => void,
    /** 通过非事件触发的回调 */
    onChangeNotByEvent?: (v: T) => void
  },
  options?: WatchOptions<Immediate>
) => {



  let changeByEvent = false

  /**
   * 设置事件
   * @param isEvent 是否是事件
   */
  const setEvent = (isEvent: boolean) => {
    changeByEvent = isEvent
  }

  const stop = watch(source, v => {
    if (!callback) return
    callback.onChange?.(v)
    if (changeByEvent) {
      callback.onChangeByEvent?.(v)
      setEvent(false)
    } else {
      callback.onChangeNotByEvent?.(v)
    }
  }, options)
  return [
    setEvent,
    stop
  ] as const
}



