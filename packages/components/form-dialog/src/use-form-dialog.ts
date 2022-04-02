import { shallowReactive, nextTick, type ShallowReactive, watch } from 'vue'

type ReactiveObj = ShallowReactive<Record<string, any>>

/**
 * 表单弹框的通用函数, 返回一个可响应式的弹框对象和一个打开弹框的方法
 * @param formData 可响应式的表单数据对象
 * @returns
 */
export default function useFormDialog<
  T extends string = 'create' | 'update',
  F extends ReactiveObj = ReactiveObj
>(formData: F) {
  const dialog = shallowReactive({
    visible: false,
    type: '' as T,
    title: '' as string,
    data: null as Partial<F> | null,
    ctx: null as any
  })

  type OpenOptions = {
    /** 标题 */
    title?: string
    /** 表单编辑或查看时回显的数据 */
    data?: null | F
    /** 自定义上下文数据 */
    ctx?: any
    /** 指定当传入回显数据时是否自动合并, 默认为true即自动合并 */
    merge?: boolean
  }
  type Open = (type: T, options?: OpenOptions) => void

  watch(() => dialog.visible, (v) => {
    !v && (dialog.data = null)
  })

  const open: Open = (type, options) => {
    dialog.visible = true
    dialog.type = type

    if (!options) return

    Object.keys(dialog).forEach(k => {
      let v = options[k as keyof OpenOptions]
      if (v !== undefined) {
        ;(dialog as any)[k] = v
      }
    })

    if (options.merge !== false && dialog.data) {
      nextTick(() => {
        Object.keys(formData).forEach(k => {
          let v = dialog.data![k as any]
          if (v !== undefined) {
            ;(formData as any)[k] = v
          }
        })
      })
    }
  }

  return [dialog, open] as  const
}