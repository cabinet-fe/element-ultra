import type { InjectionKey } from 'vue'

/** 关闭下拉框 */
export const closeDrop: InjectionKey<() => void> = Symbol()