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
  props: MultipleFormProps
  rows: ShallowRef<any[]>
  emit: MultipleFormEmits
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

  const [dialog, open] = useFormDialog(form) as any

  const submit = () => {
    const { ctx } = dialog
    let data = JSON.parse(JSON.stringify(form))
    if (dialog.type === 'create') {
      rows.value.splice(ctx.index + 1, 0, data)
    } else {
      rows.value.splice(ctx.index, 1, data)
    }
    emit('save', data, rows.value)
    emit('change', rows.value)
  }

  return {
    open,
    dialog,
    rules,
    form,

    submit
  }
}
