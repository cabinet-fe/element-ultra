import { useFormDialog } from '@element-ultra/components/form-dialog'
import { useFormModel, type FormModelItem } from '@element-ultra/components/form'
import type { MultipleFormProps } from './multiple-form'
import type { ShallowRef } from 'vue'

interface Options {
  props: MultipleFormProps
  rows: ShallowRef<any[]>
}

export default function useDialog(options: Options) {
  const { props, rows } = options

  const model = props.columns.reduce((acc, cur) => {
    acc[cur.key] = { value: cur.defaultValue, ...cur.rules } as any
    return acc
  }, {} as Record<string, FormModelItem>)

  const [formData, rules] = useFormModel(model)

  const [dialog, open] = useFormDialog(formData)

  // TODO? 如果需要切换模式, 则formData还应该是响应式的
  const submit = () => {
    const { ctx } = dialog
    if (dialog.type === 'create') {
      rows.value.splice(ctx.index + 1, 0, { ...formData })
    } else {
      rows.value.splice(ctx.index, 1, { ...formData })
    }
  }

  return {
    open,
    dialog,
    rules,
    formData,

    submit
  }
}
