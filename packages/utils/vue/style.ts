import { debugWarn } from '../error'

const SCOPE = '@element-ultra/utils/vue/style'

export function addUnit(value: string | number, defaultUnit = 'px') {
  if (!value) return ''
  const type = typeof value
  if (type === 'string') {
    return value
  } else if (type === 'number') {
    return `${value}${defaultUnit}`
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}
