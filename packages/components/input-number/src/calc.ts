
function int(numbers: number[]) {
  const numberStrings = numbers.map(n => String(n))
  const numStringsLen = numberStrings.map(ns => ns.split('.')[1]?.length ?? 0)

  const factor = Math.pow(10, Math.max(...numStringsLen))

  return {
    /** 整数 */
    ints: numbers.map(n => Math.round(n * factor)),
    /** 让所有数值成为整数的最小系数 */
    factor
  }
}
export function plus(...numbers: number[]) {
  let i = 0
  let result = 0
  const { ints, factor } = int(numbers)
  while (i < ints.length) {
    result += ints[i]!
    i++
  }
  return result / factor
}

/**
 * 依次相减
 * @param numbers 数字
 * @returns
 */
export function minus(...numbers: number[]) {
  let i = 0
  let { ints, factor } = int(numbers)

  let result = ints[0]!
  ints = ints.slice(1)
  while (i < ints.length) {
    result -= ints[i]!
    i++
  }
  return result / factor
}

/**
 * 两数相乘
 * @param num1 数字1
 * @param num2 数字2
 * @returns
 */
export function mul(num1: number, num2: number) {
  let {
    ints: [int1, int2],
    factor
  } = int([num1, num2])
  let result = int1! * int2!

  return result / (factor * factor)
}

/**
 * 两数相除
 * @param num1 数字1
 * @param num2 数字2
 * @returns
 */
export function divide(num1: number, num2: number) {
  const { ints } = int([num1, num2])
  return ints[0]! / ints[1]!
}
