import { hasOwn } from '@vue/shared'
import { throwError } from './error'
import type { Entries } from 'type-fest'

const SCOPE = 'UtilV2/objects'

export const keysOf = <T extends Record<string, any>>(arr: T) =>
  Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends Record<string, any>>(arr: T) =>
  Object.entries(arr) as Entries<T>
export { hasOwn } from '@vue/shared'

/**
 * 获取链式值
 * @param o 目标对象
 * @param prop 属性
 * @param targetProp 目标属性
 */
export function getChainValue(o: any, prop: string, targetProp?: string) {
  if (!o) return undefined
  let ret = o
  if (targetProp) {
    ret = o[targetProp]
  }

  prop &&
    prop.split('.').some(p => {
      if (p === '$last' && Array.isArray(ret)) {
        ret = ret[ret.length - 1]
      } else {
        ret = ret[p]
      }

      if (!ret) {
        return true
      }
    })
  return ret
}

export function getPropByPath(
  obj: any,
  path: string,
  strict: boolean
): {
  o: any
  k: string
  v: any
} {
  let tempObj = obj
  let key, value

  if (obj && hasOwn(obj, path)) {
    key = path
    value = tempObj?.[path]
  } else {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    const keyArr = path.split('.')
    let i = 0
    for (i; i < keyArr.length - 1; i++) {
      if (!tempObj && !strict) break
      const key = keyArr[i]

      if (key in tempObj) {
        tempObj = tempObj[key]
      } else {
        if (strict) {
          throwError(SCOPE, 'Please transfer a valid prop path to form item!')
        }
        break
      }
    }
    key = keyArr[i]
    value = tempObj?.[keyArr[i]]
  }
  return {
    o: tempObj,
    k: key,
    v: value
  }
}

const isObject = (v: any): v is Record<string, any> =>
  Object.prototype.toString.call(v).slice(8, -1) === 'Object'

/**
 * 对象深度继承, 引用类型的值不进行合并
 * @param data1 对象1
 * @param data2 对象2
 * @param extendEmpty 是否继承空值, 默认false
 */
export const deepExtend = (
  data1: Record<string, any>,
  data2: Record<string, any>,
  extendEmpty = false
) => {
  for (const key in data1) {
    let value1 = data1[key]
    let value2 = data2[key]
    if (isObject(value1)) {
      isObject(value2) && deepExtend(value1, value2, extendEmpty)
    } else if ((value2 !== undefined && value2 !== null) || extendEmpty) {
      data1[key] = value2
    }
  }
}

export function deepCopy<O extends any>(val: O): O {
  if (Array.isArray(val)) {
    let result: any[] = []
    val.forEach(item => {
      result.push(deepCopy(item))
    })

    return result as O
  }
  if (isObject(val)) {
    let result: Record<string, any> = {}
    for (const key in val) {
      result[key] = deepCopy(val[key])
    }
    return result as O
  }

  return val
}
