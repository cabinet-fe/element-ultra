import { deepExtend } from '@element-ultra/utils'
import { nextTick, watch, shallowReactive } from 'vue'

type Dialog<Type, Data, Ctx> = {
  visible: boolean
  type?: Type
  title: string
  data: Data
  ctx: Ctx | null
}

type OpenOptions<T, C> = {
  /** 标题 */
  title?: string
  /** 表单编辑或查看时回显的数据 */
  data?: null | T
  /** 自定义上下文数据 */
  ctx?: C
  /** 指定当传入回显数据时是否自动合并, 默认为true即自动合并 */
  merge?: boolean
}

type Open<T, F, C> = (type: T, options?: OpenOptions<F, C>) => void

/**
 * 表单弹框的通用函数, 返回一个可响应式的弹框对象和一个打开弹框的方法
 * @param formData 可响应式的表单数据对象
 * @returns
 */
export default function useFormDialog<
  Type extends string = 'create' | 'update',
  Ctx extends any = any,
  F extends Record<string, any> | Record<string, any>[] = any
>(formData: F) {
  type Data = (F & Record<string, any>) | null

  // 弹框对象
  const dialog = shallowReactive<Dialog<Type, Data, Ctx>>({
    visible: false,
    type: undefined,
    title: '',
    data: null,
    ctx: null
  })

  watch(
    () => dialog.visible,
    v => {
      if (!v) {
        dialog.data = null
        dialog.ctx = null
        dialog.title = ''
        dialog.type = undefined
      }
    }
  )

  const open: Open<
    Type,
    F extends any[] ? Partial<F[number]>[] : Partial<F>,
    Ctx
  > = (type, options) => {
    dialog.visible = true
    dialog.type = type

    if (!options) return

    Object.keys(dialog).forEach(k => {
      let v = options[k as keyof OpenOptions<F, Ctx>]
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
