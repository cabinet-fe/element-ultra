import { deepExtend } from '@element-ultra/utils'
import { nextTick, watch, shallowReactive } from 'vue'

type OpenOptions<T> = {
  /** 标题 */
  title?: string
  /** 表单编辑或查看时回显的数据 */
  data?: null | T
  /** 自定义上下文数据 */
  ctx?: any
  /** 指定当传入回显数据时是否自动合并, 默认为true即自动合并 */
  merge?: boolean
}

type Open<T, F> = (type: T, options?: OpenOptions<F>) => void

/**
 * 表单弹框的通用函数, 返回一个可响应式的弹框对象和一个打开弹框的方法
 * @param formData 可响应式的表单数据对象
 * @returns
 */
export default function useFormDialog<
  Type extends string = 'create' | 'update',
  F = any
>(formData: F) {
  type Data = (F & Record<string, any>) | null

  // 弹框对象
  const dialog = shallowReactive({
    visible: false,
    type: '' as Type | '',
    title: '',
    data: null as Data,
    ctx: null as any
  })

  watch(
    () => dialog.visible,
    v => {
      if (!v) {
        dialog.data = null
        dialog.ctx = null
        dialog.title = ''
        dialog.type = ''
      }
    }
  )

  const open: Open<
    Type,
    F extends any[] ? Partial<F[number]>[] : Partial<F>
  > = (type, options) => {
    dialog.visible = true
    dialog.type = type

    if (!options) return

    Object.keys(dialog).forEach(k => {
      let v = options[k as keyof OpenOptions<F>]
      if (v !== undefined) {
        ;(dialog as any)[k] = v
      }
    })

    // 合并值
    if (options.merge !== false && dialog.data) {
      nextTick(() => {
        // 数组
        if (Array.isArray(formData)) {
          return formData.forEach((item, i) => {
            deepExtend(item, dialog.data![i])
          })
        }

        deepExtend(formData, dialog.data!)
      })
    }
  }

  return [dialog, open] as const
}
