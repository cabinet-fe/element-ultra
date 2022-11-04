import { useFormDialog } from '@element-ultra/components/form-dialog'
import {
  useFormModel,
  type FormModelItem
} from '@element-ultra/components/form'
import type {
  MultipleFormColumn,
  MultipleFormEmits,
  MultipleFormProps
} from './multiple-form'
import type { ShallowRef } from 'vue'

interface Options {
  /** 对象属性 */
  props: MultipleFormProps
  /** 行数据 */
  rows: ShallowRef<any[]>
  /** 触发事件 */
  emit: MultipleFormEmits
  emitChange: () => void
}

export default function useDialogEdit(options: Options) {
  const { props, rows, emit } = options
  // 根据列生成数据模型

  const getModel = (columns: MultipleFormColumn[]) => {
    const model = {} as Record<string, FormModelItem>
    // 将列转化为表单的模型校验
    columns.forEach(column => {
      let { defaultValue } = column
      // 引用类型需要
      if (defaultValue instanceof Function) {
        let v = defaultValue()
        if (v instanceof Promise) {
          model[column.key] = { ...column.rules } as any
          v.then(result => (form[column.key] = result))
        } else {
          model[column.key] = { value: v, ...column.rules } as any
        }
      } else {
        model[column.key] = {
          value: column.defaultValue,
          ...column.rules
        } as any
      }

      // 如果有嵌套
      if (column.nest) {
        model[column.key].children = getModel(column.nest)
      }
    })

    return model
  }

  const model = getModel(props.columns!)

  const [form, rules] = useFormModel(model)

  const [dialog, open] = useFormDialog(form)

  const submit = () => {
    const { ctx } = dialog
    // 因为所有行的model共用同一个, 因此在提交时需要深拷贝一份出来
    const data = JSON.parse(JSON.stringify(form))
    if (dialog.type === 'create') {
      rows.value = [
        ...rows.value.slice(0, ctx.index),
        data,
        ...rows.value.slice(ctx.index)
      ]
    } else {
      rows.value = [
        ...rows.value.slice(0, ctx.index),
        data,
        ...rows.value.slice(ctx.index + 1)
      ]
    }
    emit('save', data, rows.value)
    options.emitChange()
  }

  return {
    open,
    dialog,
    rules,
    form,

    submit
  }
}
